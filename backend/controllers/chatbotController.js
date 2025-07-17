import OpenAI from "openai";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctormodel.js";
import userModel from "../models/userModel.js";
import chatSessionModel from "../models/chatSessionModel.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function toSlotDateFormat(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${parseInt(day)}_${parseInt(month)}_${year}`;
}

async function askOpenAI(message) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: message }],
  });
  return completion.choices[0].message.content.trim();
}

const chatbotQuery = async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res.json({ success: false, message: "Missing userId or message" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "Invalid user" });

    const msg = message.trim().toLowerCase();

    // 🌟 0. CLEAR SESSION
    if (msg.includes("clear session") || msg.includes("reset chat")) {
      await chatSessionModel.deleteOne({ userId });
      return res.json({
        success: true,
        reply: "✅ Chat session has been cleared. Let's start fresh!"
      });
    }

    // 🌟 1. LOAD SESSION (if exists)
    let session = await chatSessionModel.findOne({ userId });

    // 🌟 2. FIRST GREETING
    if (!session) {
      session = await chatSessionModel.create({ userId, mode: "" });
      return res.json({
        success: true,
        reply: "👋 Hello! How can I help you today?\nYou can say things like:\n- 'list doctors'\n- 'view my appointments'\n- 'book appointment'"
      });
    }

    // 🌟 3. Handle General Commands

    // View My Appointments
    if (msg.includes("my appointments") || msg.includes("view appointments")) {
      const appointments = await appointmentModel.find({ userId, cancelled: false });
      if (!appointments.length) {
        return res.json({ success: true, reply: "You have no upcoming appointments." });
      }

      const reply = appointments
        .map((a, i) => {
          const doc = a.docData;
          const name = doc?.name || "Doctor";
          const speciality = doc?.speciality ? ` (${doc.speciality})` : "";
          return `Appointment ${i + 1}\nDoctor: ${name}${speciality}\nDate: ${a.slotDate}\nTime: ${a.slotTime}`;
        })
        .join("\n\n");

      return res.json({ success: true, reply });
    }

    // Cancel appointment by index
    if (msg.startsWith("cancel appointment")) {
      const parts = msg.trim().split(" ");
      const lastPart = parts[parts.length - 1];
      const index = parseInt(lastPart);
      if (isNaN(index) || index < 1) {
        return res.json({
          success: false,
          reply: "❌ Please specify the appointment number to cancel. Example: 'cancel appointment 2'"
        });
      }

      // Get user's active appointments
      const appointments = await appointmentModel
        .find({ userId, cancelled: false })
        .sort({ date: 1 });

      if (!appointments.length) {
        return res.json({
          success: false,
          reply: "You have no active appointments to cancel."
        });
      }

      if (index > appointments.length) {
        return res.json({
          success: false,
          reply: `❌ Invalid appointment number. You only have ${appointments.length} appointment(s).`
        });
      }

      // Cancel it
      const appointment = appointments[index - 1];
      appointment.cancelled = true;
      await appointment.save();

      const doctor = await doctorModel.findById(appointment.docId);
      if (doctor) {
        const { slotDate, slotTime } = appointment;
        if (doctor.slots_booked && doctor.slots_booked[slotDate]) {
          doctor.slots_booked[slotDate] = doctor.slots_booked[slotDate].filter(s => s !== slotTime);
          await doctor.save();
        }
      }

      return res.json({
        success: true,
        reply: `✅ Appointment #${index} has been cancelled successfully.`
      });
    }

    // List doctors
    if (msg.includes("list doctors") || msg.includes("show doctors") || msg.includes("available doctors")) {
      const doctors = await doctorModel.find().select("name speciality degree experience fees image about available");
      if (!doctors.length) {
        return res.json({ success: true, reply: "No doctors found in the system." });
      }
      return res.json({ success: true, replyType: "doctorList", data: doctors });
    }

    // 🌟 4. Start Booking
    if (msg.includes("book appointment") || msg.includes("book with")) {
      session.mode = "booking";
      session.bookingDraft = {};
      await session.save();
      return res.json({ success: true, reply: "Sure! Which doctor would you like to book with?" });
    }

    // 🌟 5. Continue Booking Flow
    if (session.mode === "booking") {
      let draft = session.bookingDraft || {};

      // Doctor name step
      if (!draft.doctorName) {
        const doctorMatch = message.match(/dr\.?\s*([a-zA-Z.'\s]+)/i);
        if (doctorMatch) {
          draft.doctorName = doctorMatch[1].trim();
        } else {
          draft.doctorName = message.trim();
        }
        session.bookingDraft = draft;
        await session.save();
        return res.json({ success: true, reply: "On which date? (Please use YYYY-MM-DD format)" });
      }

      // Date step
      if (!draft.slotDate) {
        const dateMatch = message.match(/(\d{4}[-/]\d{2}[-/]\d{2})/);
        if (dateMatch) {
          draft.slotDate = toSlotDateFormat(dateMatch[1]);
          session.bookingDraft = draft;
          await session.save();
          return res.json({ success: true, reply: "At what time? (e.g., 10:00 AM)" });
        }
        return res.json({ success: true, reply: "Please provide the date in YYYY-MM-DD format." });
      }

      // Time step
      if (!draft.slotTime) {
        draft.slotTime = message.trim().toUpperCase();
        session.bookingDraft = draft;
        await session.save();
      }

      // ✅ All details present: Attempt to book
      if (draft.doctorName && draft.slotDate && draft.slotTime) {
        const doctor = await doctorModel.findOne({
          name: new RegExp(draft.doctorName, "i")
        });

        if (!doctor) {
          await chatSessionModel.deleteOne({ userId });
          return res.json({
            success: true,
            reply: `❌ No doctor found with name "${draft.doctorName}". Let's start over.`
          });
        }

        // ✅ Check availability
        if (!doctor.available) {
          await chatSessionModel.deleteOne({ userId });
          return res.json({
            success: true,
            reply: `❌ Sorry, Dr. ${doctor.name} is currently not available for appointments.`
          });
        }

        // ✅ Check slot
        const slots_booked = doctor.slots_booked || {};
        if (!slots_booked[draft.slotDate]) {
          slots_booked[draft.slotDate] = [];
        }
        if (slots_booked[draft.slotDate].includes(draft.slotTime)) {
          await chatSessionModel.deleteOne({ userId });
          return res.json({
            success: true,
            reply: `❌ Sorry, Dr. ${doctor.name} is not available on ${draft.slotDate} at ${draft.slotTime}. Please start over.`
          });
        }

        // ✅ Book it
        slots_booked[draft.slotDate].push(draft.slotTime);
        await doctorModel.findByIdAndUpdate(doctor._id, { slots_booked });

        const userData = await userModel.findById(userId).select("-password");

        await appointmentModel.create({
          userId,
          docId: doctor._id,
          userData,
          docData: doctor,
          slotDate: draft.slotDate,
          slotTime: draft.slotTime,
          docDate: doctor.date,
          amount: doctor.fees,
          date: Date.now(),
        });

        await chatSessionModel.deleteOne({ userId });
        return res.json({
          success: true,
          reply: `✅ Appointment booked successfully with Dr. ${doctor.name} on ${draft.slotDate} at ${draft.slotTime}.`
        });
      }
    }

    // 🌟 6. Fallback to OpenAI for FAQs
    const aiReply = await askOpenAI(message);
    return res.json({ success: true, reply: aiReply });

  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

const clearChatbotSession = async (req, res) => {
  const { userId } = req.body;
  await chatSessionModel.deleteOne({ userId });
  res.json({ success: true, message: "✅ Chat session cleared." });
};

export { chatbotQuery, clearChatbotSession };

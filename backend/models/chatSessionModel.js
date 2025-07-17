import mongoose from "mongoose";

const chatSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  mode: { type: String, default: "" },              // "booking" | "" 
  bookingDraft: {
    doctorName: String,
    slotDate: String,
    slotTime: String
  }
});

export default mongoose.model("ChatSession", chatSessionSchema);

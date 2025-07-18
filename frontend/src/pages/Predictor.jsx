import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import Chatbot from "../components/Chatbot";
import { toast } from "react-toastify";

export default function Predictor() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictedDiseases, setPredictedDiseases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const diseaseDoctorMap = {
    "Fungal infection": "Dermatologist",
    "Allergy": "Allergist",
    "GERD": "Gastroenterologist",
    "Chronic cholestasis": "Gastroenterologist",
    "Drug Reaction": "Dermatologist",
    "Peptic ulcer disease": "Gastroenterologist",
    "AIDS": "Infectious Disease Specialist",
    "Diabetes": "Endocrinologist",
    "Gastroenteritis": "Gastroenterologist",
    "Bronchial Asthma": "Pulmonologist",
    "Hypertension": "Cardiologist",
    "Migraine": "Neurologist",
    "Cervical spondylosis": "Orthopedic / Neurologist",
    "Paralysis (brain hemorrhage)": "Neurologist",
    "Jaundice": "Hepatologist",
    "Malaria": "Infectious Disease Specialist",
    "Chicken pox": "General Physician",
    "Dengue": "Infectious Disease Specialist",
    "Typhoid": "General Physician",
    "Hepatitis A": "Hepatologist",
    "Hepatitis B": "Hepatologist",
    "Hepatitis C": "Hepatologist",
    "Hepatitis D": "Hepatologist",
    "Hepatitis E": "Hepatologist",
    "Alcoholic hepatitis": "Hepatologist",
    "Tuberculosis": "Pulmonologist",
    "Common Cold": "General Physician",
    "Pneumonia": "Pulmonologist",
    "Heart attack": "Cardiologist",
    "Varicose veins": "Vascular Surgeon",
    "Hypothyroidism": "Endocrinologist",
    "Hyperthyroidism": "Endocrinologist",
    "Hypoglycemia": "Endocrinologist",
    "Osteoarthristis": "Orthopedic",
    "Arthritis": "Rheumatologist",
    "Vertigo": "Neurologist / ENT Specialist",
    "Acne": "Dermatologist",
    "Urinary tract infection": "Urologist",
    "Psoriasis": "Dermatologist",
    "Impetigo": "Dermatologist",
    "No strong prediction (try more symptoms)": "-",
  };

  useEffect(() => {
    setSymptoms([
      "itching",
      "skin_rash",
      "nodal_skin_eruptions",
      "continuous_sneezing",
      "shivering",
      "chills",
      "joint_pain",
      "stomach_pain",
      "acidity",
      "ulcers_on_tongue",
      "muscle_wasting",
      "vomiting",
      "burning_micturition",
      "spotting_ urination",
      "fatigue",
      "weight_gain",
      "anxiety",
      "cold_hands_and_feets",
      "mood_swings",
      "weight_loss",
      "restlessness",
      "lethargy",
      "patches_in_throat",
      "irregular_sugar_level",
      "cough",
      "high_fever",
      "sunken_eyes",
      "breathlessness",
      "sweating",
      "dehydration",
      "indigestion",
      "headache",
      "yellowish_skin",
      "dark_urine",
      "nausea",
      "loss_of_appetite",
      "pain_behind_the_eyes",
      "back_pain",
      "constipation",
      "abdominal_pain",
      "diarrhoea",
      "mild_fever",
      "yellow_urine",
      "yellowing_of_eyes",
      "acute_liver_failure",
      "fluid_overload",
      "swelling_of_stomach",
      "swelled_lymph_nodes",
      "malaise",
      "blurred_and_distorted_vision",
      "phlegm",
      "throat_irritation",
      "redness_of_eyes",
      "sinus_pressure",
      "runny_nose",
      "congestion",
      "chest_pain",
      "weakness_in_limbs",
      "fast_heart_rate",
      "pain_during_bowel_movements",
      "pain_in_anal_region",
      "bloody_stool",
      "irritation_in_anus",
      "neck_pain",
      "dizziness",
      "cramps",
      "bruising",
      "obesity",
      "swollen_legs",
      "swollen_blood_vessels",
      "puffy_face_and_eyes",
      "enlarged_thyroid",
      "brittle_nails",
      "swollen_extremeties",
      "excessive_hunger",
      "extra_marital_contacts",
      "drying_and_tingling_lips",
      "slurred_speech",
      "knee_pain",
      "hip_joint_pain",
      "muscle_weakness",
      "stiff_neck",
      "swelling_joints",
      "movement_stiffness",
      "spinning_movements",
      "loss_of_balance",
      "unsteadiness",
      "weakness_of_one_body_side",
      "loss_of_smell",
      "bladder_discomfort",
      "foul_smell_of urine",
      "continuous_feel_of_urine",
      "passage_of_gases",
      "internal_itching",
      "toxic_look_(typhos)",
      "depression",
      "irritability",
      "muscle_pain",
      "altered_sensorium",
      "red_spots_over_body",
      "belly_pain",
      "abnormal_menstruation",
      "dischromic _patches",
      "watering_from_eyes",
      "increased_appetite",
      "polyuria",
      "family_history",
      "mucoid_sputum",
      "rusty_sputum",
      "lack_of_concentration",
      "visual_disturbances",
      "receiving_blood_transfusion",
      "receiving_unsterile_injections",
      "coma",
      "stomach_bleeding",
      "distention_of_abdomen",
      "history_of_alcohol_consumption",
      "fluid_overload.1",
      "blood_in_sputum",
      "prominent_veins_on_calf",
      "palpitations",
      "painful_walking",
      "pus_filled_pimples",
      "blackheads",
      "scurring",
      "skin_peeling",
      "silver_like_dusting",
      "small_dents_in_nails",
      "inflammatory_nails",
      "blister",
      "red_sore_around_nose",
      "yellow_crust_ooze",
    ]);
  }, []);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };
  const clearAll = () => {
    setSelectedSymptoms([]);
  };

  const predictDiseases = () => {
    if (selectedSymptoms.length === 0) {
      toast.error("Please select at least one symptom!");
      return;
    }

    setLoading(true);
    fetch(`${import.meta.env.VITE_ML_SERVER_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: selectedSymptoms }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPredictedDiseases(data.predicted_diseases);
        toast.success("Prediction completed successfully!");
      })
      .catch(() => {
        toast.error("Failed to get prediction. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative">
      <div>
        <ThemeToggle />
      </div>
      <div>
        <Chatbot />
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-10 w-10 text-white mb-4"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              <p className="text-white text-lg">Predicting...</p>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold text-center mb-6">
          Disease Predictor
        </h1>
        <div className="max-w-xl mx-auto mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 border-black focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary dark:bg-gray-800 dark:border-gray-700"
          />
          <button
            onClick={clearAll}
            className="bg-primary dark:bg-secondary text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {symptoms
            .filter((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((symptom, idx) => (
              <div
                key={idx}
                onClick={() => toggleSymptom(symptom)}
                className={`relative border rounded-lg p-4 w-30 h-12 flex items-center justify-center text-center break-words overflow-hidden cursor-pointer transition
  ${
    selectedSymptoms.includes(symptom)
      ? "border-blue-600 bg-blue-50 font-bold text-black"
      : "border-gray-300 hover:border-blue-400"
  }
`}
              >
                {symptom}
              </div>
            ))}
        </div>

        <div className="text-center mt-6 flex justify-center ">
          <button
            onClick={predictDiseases}
            className="bg-primary dark:bg-secondary text-white px-6 py-2 rounded-lg  transition mt-4 flex items-center justify-center"
          >
            <Sparkles className="mr-2 w-5 h-5" /> Predict Diseases
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Predicted Diseases</h2>
          
          {predictedDiseases.length > 0 ? (
            <div>
            <h4 className="text-md mb-4"> There may be chances of :</h4>
            
            <table className="min-w-full border border-gray-300">
              <thead className="bg-primary dark:bg-secondary text-white">
                <tr>
                  <th className="py-2 px-4 border">Disease</th>
                  <th className="py-2 px-4 border">Recommended Doctor</th>
                </tr>
              </thead>
              <tbody>
                {predictedDiseases.map((disease, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 px-4 border break-words max-w-xs">
                      {disease}
                    </td>
                    <td className="py-2 px-4 border">
                      {diseaseDoctorMap[disease] || "General Physician"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <p className="text-gray-500">No predictions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

from flask import Flask, request, jsonify
from flask_cors import CORS  # type: ignore
import joblib
import pandas as pd

# ------------------------------
# CONFIGURATION
# ------------------------------
MODEL_PATH = 'assets/dup_model.pkl'
TRAINING_CSV_PATH = 'assets/Training.csv'
PREDICTION_THRESHOLD = 0.05

# ------------------------------
# FLASK APP SETUP
# ------------------------------
app = Flask(__name__)
CORS(app)

# ------------------------------
# LOAD MODEL
# ------------------------------
with open(MODEL_PATH, 'rb') as f:
    model, mlb = joblib.load(f)

# ------------------------------
# LOAD SYMPTOMS LIST
# ------------------------------
training_df = pd.read_csv(TRAINING_CSV_PATH)
symptoms_list = training_df.columns[:-1].tolist()
FEATURE_LENGTH = len(symptoms_list)
symptom_to_index = {symptom: i for i, symptom in enumerate(symptoms_list)}
print(f"Loaded {FEATURE_LENGTH} symptoms.")

# ------------------------------
# LOAD DISEASE CLASSES
# ------------------------------
all_diseases = list(mlb.classes_)
print(f"Model predicts for {len(all_diseases)} diseases.")

# ------------------------------
# ROOT ROUTE
# ------------------------------
@app.route('/', methods=['GET'])
def home():
    return jsonify({"service": "multilabel-disease-predictor", "status": "active"}), 200

# ------------------------------
# PREDICT ROUTE
# ------------------------------
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        if not data or 'symptoms' not in data:
            return jsonify({'error': 'No symptoms provided'}), 400

        user_symptoms = data['symptoms']

        # Validate and build input vector
        input_vector = [0] * FEATURE_LENGTH
        for symptom in user_symptoms:
            idx = symptom_to_index.get(symptom)
            if idx is not None:
                input_vector[idx] = 1

        # Predict probabilities for each disease
        proba_list = model.predict_proba([input_vector])

        predicted_diseases = []
        for i, clf_proba in enumerate(proba_list):
            # clf_proba is of shape (1, 2)
            prob_class1 = clf_proba[0][1]
            if prob_class1 >= PREDICTION_THRESHOLD:
                predicted_diseases.append(all_diseases[i])

        if not predicted_diseases:
            predicted_diseases.append("No strong prediction (try more symptoms)")

        return jsonify({
            'input_symptoms': [str(s) for s in user_symptoms],
            'predicted_diseases': [str(d) for d in predicted_diseases]
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------------------
# MAIN
# ------------------------------
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

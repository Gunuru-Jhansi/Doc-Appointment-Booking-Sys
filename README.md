# DocEase - Doctor Appointment & Disease Prediction Platform

DocEase is a full-stack AI-powered healthcare platform that allows users to:

- Book doctor appointments online
- View doctors by specialty and location
- Chat with an AI chatbot to get help or automate tasks
- Predict diseases from symptoms using a trained ML model

## 🔗 Live Links

- **Frontend (User Panel)**: [https://your-frontend-url.onrender.com](https://docease-frontend.onrender.com)
- **Admin Panel**: [https://your-admin-url.onrender.com](https://docease-admin.onrender.com)
- **Backend API**: [https://docease-ca2b.onrender.com]( https://docease-ca2b.onrender.com)
- **ML server**:[https://docease-mlserver.onrender.com](https://docease-mlserver.onrender.com)

---

### 🏗️ Tech Stack

| Layer       | Technology                                 |
|-------------|--------------------------------------------|
| Frontend    | React.js + Vite + Tailwind CSS             |
| Backend     | Node.js + Express + MongoDB                |
| ML Server   | Python + Flask + scikit-learn              |
| Auth & Pay  | JWT, Razorpay Integration                  |
| Map         | Leaflet.js + OpenStreetMap + Overpass API  |
| Deployment  | Render.com                                 |
| AI          | OpenAI API                                 |

---

## 🚀 Features

### 👨‍⚕️ For Doctors
- View, complete, and cancel appointments
- View earnings and dashboard stats
- Update their profile icons ,name ,address and appointment fees.

### 🧑‍💻 For Admin
- Manage doctors and their availability
- View all appointments and dashboard

### 🧑‍🤝‍🧑 For Patients
- SignUp , login and Manage profiles
- Book, View and cancel appointments
- Show nearby hospitals and clinics in Map based on radius 
- Online payments via Razorpay
- Review & Rate the doctor once to let others know their experience
- Prediction of possible Diseases and recommendation of respective doctors using ML model
- A chatBot to one-to-one assistance of booking,viewing,cancelling the appointments and general FAQs
- Filtering of doctors based on speciality and location 

### 🧠 ML Disease Predictor
- Inputs: list of symptoms
- Output: predicted diseases (multi-label)
- Trained on 130+ symptoms, 40+ diseases

---



## 🛠️ Setup Instructions

### 1. Clone the Repo

git clone [https://github.com/your-username/docease.git](https://github.com/Gunuru-Jhansi/Doc-Appointment-Booking-Sys.git)

cd docease


### 2. Setup Environment Variables

Create a .env file in both backend/ and frontend/ folders.

Frontend .env
```bach
VITE_BACKEND_URL=https://docease-ca2b.onrender.com
VITE_RAZORPAY_KEY=your_razorpay_public_key
```
backend .env
```bash
PORT=5000
MONGO_URL=your_mongo_connection
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
---



### 3. Run Locally

###  Folder Structure
/frontend        → React frontend (Vite)
/admin           → Admin panel
/backend         → Node.js backend
/ML_server       → FLask backend , model of the predictor


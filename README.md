# DocEase - Doctor Appointment & Disease Prediction Platform

DocEase is a full-stack AI-powered healthcare platform that allows users to:

- Book doctor appointments online
- View doctors by specialty and location
- Chat with an AI chatbot to get help or automate tasks
- Predict diseases from symptoms using a trained ML model

## 🔗 Live Links

- **Frontend (User Panel)**:[https://docease-frontend.onrender.com](https://docease-frontend.onrender.com)
- **Admin Panel**: [https://docease-admin.onrender.com](https://docease-admin.onrender.com)
- **Backend API**: [https://docease-backend-hy9z.onrender.com](https://docease-backend-hy9z.onrender.com)
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
- Dark/Light Mode Toggle

### 🧠 ML Disease Predictor
- Inputs: list of symptoms
- Output: predicted diseases (multi-label)
- Trained on 130+ symptoms, 40+ diseases

---



## 🛠️ Setup Instructions

### 1. Clone the Repo

git clone [https://github.com/Gunuru-Jhansi/Doc-Appointment-Booking-Sys.git](https://github.com/Gunuru-Jhansi/Doc-Appointment-Booking-Sys.git)

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

###4. Screenshots 

prediction page : <img width="1276" height="587" alt="predict" src="https://github.com/user-attachments/assets/50a24013-db91-4d17-9d0a-98dda40d887e" />

chatbot : <img width="1366" height="593" alt="chatbot" src="https://github.com/user-attachments/assets/44697e75-9b10-48da-8b86-96b2cfe4f7c6" />

Map integration : <img width="1288" height="598" alt="map" src="https://github.com/user-attachments/assets/83f447d6-87e9-49d2-bcf7-20e6187c79e3" />

Doctor Dashboard : <img width="1366" height="596" alt="doc_ ro" src="https://github.com/user-attachments/assets/825b1bc9-1f0b-4203-b7d5-866d94e1d31c" />

Filterin Doctors By speciality and location : <img width="1267" height="577" alt="doctor" src="https://github.com/user-attachments/assets/51d9941d-5771-46d8-b575-65ee1f9af842" />

Light Mode : <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d3988c90-2ee6-438e-be1f-5ee075fa3153" />






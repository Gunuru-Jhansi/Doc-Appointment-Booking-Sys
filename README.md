# 🩺 DocEase - Doctor Appointment Booking System

A full-stack appointment booking system for doctors and patients. Built with React, Node.js, Express, MongoDB, and Razorpay for secure online payments.

---

## 🔗 Live Links

- **Frontend (User Panel)**: [https://your-frontend-url.onrender.com](https://docease-frontend.onrender.com)
- **Admin Panel**: [https://your-admin-url.onrender.com](https://docease-admin.onrender.com)
- **Backend API**: [https://docease-ca2b.onrender.com]( https://docease-ca2b.onrender.com)

---

## 🚀 Features

### 👨‍⚕️ For Doctors
- View, complete, and cancel appointments
- View earnings and dashboard stats

### 🧑‍💻 For Admin
- Manage doctors and their availability
- View all appointments and dashboard

### 🧑‍🤝‍🧑 For Patients
- Book appointments with available doctors
- View and cancel upcoming appointments
- Online payments via Razorpay

---

## ⚙️ Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment Gateway**: Razorpay
- **Deployment**: Render.com

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

git clone https://github.com/your-username/docease.git
cd docease


### 2. Setup Environment Variables
Create a .env file in both backend/ and frontend/ folders.

Frontend .env
VITE_BACKEND_URL=https://docease-ca2b.onrender.com
VITE_RAZORPAY_KEY=your_razorpay_public_key

Backend .env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

### 3. Run Locally

###  Folder Structure
/frontend        → React frontend (Vite)
/admin           → Admin panel (optional if separated)
/backend         → Node.js backend


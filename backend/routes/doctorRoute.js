import express from 'express'
import { doctorList,getDoctorById,uploadDoctorImage,loginDoctor,doctorProfile,updateDoctorProfile,appointmentDoctor,doctorDashboard,appointmentCancel,appointmentComplete } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'

import upload from '../middlewares/multer.js'
const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
doctorRouter.get('/:id', getDoctorById);
doctorRouter.post('/upload-image', authDoctor, upload.single('image'), uploadDoctorImage);


export default doctorRouter


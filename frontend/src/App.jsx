import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import DoctorReview from './pages/DoctorReview'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Predictor from './pages/Predictor'

const App = () => {
  return (
  
    <div className='min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300'>
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/doctors' element={<Doctors/>}/>
          <Route path='/doctors/:speciality' element={<Doctors/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/my-profile' element={<MyProfile/>}/>
          <Route path='/my-appointments' element={<MyAppointments/>}/>
          <Route path='/predictor' element={<Predictor/>}/>
          <Route path='/appointment/:docId' element={<Appointment/>}/>
          <Route path='/review/:doctorId' element={<DoctorReview/>}/>
          <Route path="*" element={<div>Page Not Found</div>} />
       </Routes>
       <Footer/>
    </div>
    </div>
  )
}

export default App

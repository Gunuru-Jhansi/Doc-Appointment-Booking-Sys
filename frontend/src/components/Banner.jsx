import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Banner = () => {
    const navigate=useNavigate()
  return (
    <div className='flex bg-primary dark:bg-secondary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
      {/* ----------Left Side------------ */}
      <div className='flex-1 py-8 sm:py-16 lg:py-24 lg:pl-5'>
        <div>
            <p className='text-gray-900 dark:text-white font-semibold text-lg'>Book Appointment</p>
            <p className='text-white font-medium dark:text-black'>With 100+ Trusted Doctors</p>
        </div>
      <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className='bg-black text-sm sm:text-base text-white px-8 py-3 rounded-full mt-6 hover:scale-105 hover:bg-white hover:text-black transition-all duration-500'>Create Account</button>

      </div>
      {/* -----------Right Side---------- */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner

import React from 'react'
import { assets } from '../assets/assets'
import ThemeToggle from '../components/ThemeToggle'
const Contact = () => {

  return (
    <div>
      <div>
        <ThemeToggle/>
      </div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p className='dark:text-gray-300'>CONTACT <span className='text-gray-700 font-semibold dark:text-white'>US</span></p>
      </div>
      <div  className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
      
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-lg text-gray-600 dark:text-white'>OUR OFFICE</p>
        <p className='text-gray-500 dark:text-gray-300'>00000 Willms Station <br />
        Suite 000, Washington, USA</p>
        <p className='text-gray-500 dark:text-gray-300'>Tel: (000) 000-0000 <br />
        Email: gunurjhansi@gmail.com</p>
        <p className='font-semibold text-lg text-gray-600 dark:text-white'>CAREERS AT PRESCRIPTO</p>
        <p className='text-gray-500 dark:text-gray-300'>Learn more about our teams and job openings</p>
        <button className='text-sm px-8 py-4 border border-black dark:border-white hover:bg-black hover:text-white transition-all duration-500'> Explore Jobs</button>
      </div>
    </div>
    </div>
  )
}

export default Contact

import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        {/* ----------Left Section----------- */}
        <div>
            <img className='mb-5 w-32 h-28' src={assets.tilo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 dark:text-gray-400 leading-6'>Lorem ipsum dolor, dolorum ipsa nam voluptate sunt pariatur atque qui ipsum eligendi quod, minima iure.</p>
        </div>
        {/* ----------Center Section----------- */}
        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600 dark:text-gray-400'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
      
        {/* ----------Right Section----------- */}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600 dark:text-gray-400'>
                <li>+1 212-345-56789</li>
                <li>gunurujhansi@gmail.com</li>
            </ul>
        </div>
        <div>
            {/* ---------Copy right text--------- */}
            <hr />
            <p className='py-5 text-sm text-center'>Copyrights reserved &copy;</p>
        </div>
    </div>
    </div>
  )
}

export default Footer

import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-100 px-6 md:px-10 py-10'>
      
      {/* Top Section: Left, Center, Right */}
      <div className='flex flex-col md:flex-row justify-between gap-10'>

        {/* Left Section */}
        <div className='flex-1 max-w-xs'>
          <img src={assets.logo} alt="Logo" className='w-32 mb-4' />
          <p className='text-sm text-gray-600 leading-relaxed'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Center Section */}
        <div className='flex-1 text-center md:text-left'>
          <p className='text-lg font-semibold mb-4'>Company</p>
          <ul className='flex flex-col gap-2 text-sm text-gray-600'>
            <li className='hover:text-primary-500 cursor-pointer'>Home</li>
            <li className='hover:text-primary-500 cursor-pointer'>About Us</li>
            <li className='hover:text-primary-500 cursor-pointer'>Contact Us</li>
            <li className='hover:text-primary-500 cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className='flex-1 text-right md:text-left'>
          <p className='text-lg font-semibold mb-4'>Get in Touch</p>
          <ul className='flex flex-col gap-2 text-sm text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>akhtardahri945@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className='mt-10'>
        <hr className='border-t-2 border-blue-500' />
        <p className='text-center text-sm text-gray-500 mt-4'>
          Copyright © 2026 AkhtarDahri - All Right Reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer
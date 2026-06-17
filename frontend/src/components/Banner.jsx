import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate() 

  return (
    <div className='flex flex-col lg:flex-row bg-primary-500 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 items-center lg:justify-between gap-8'>
      
      {/* Left Side */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-4'>
        
        <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white'>
          Book Appointment
        </p>

        <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white'>
          With 100+ Trusted Doctors
        </p>

        <button
          onClick={() => {navigate('/login'); scrollTo(0,0)}}
          className='bg-white text-primary-500 text-sm sm:text-base px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'
        >
          Create Account
        </button>

      </div>

      {/* Right Side */}
      <div className='flex justify-center lg:justify-end w-full lg:w-auto'>
        <img 
          src={assets.appointment_img} 
          alt="Appointment" 
          className='w-64 md:w-80 lg:w-96'
        />
      </div>

    </div>
  )
}

export default Banner 
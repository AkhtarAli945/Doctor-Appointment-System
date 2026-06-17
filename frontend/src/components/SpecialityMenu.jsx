// import React from 'react'
// import {specialityData} from '../assets/assets_frontend/assets'
// import { Link } from 'react-router-dom'

// const SpecialityMenu = () => {
//   return (
//     <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
//         <h1 className='text-3xl font-medium'>Find BY Speciality</h1>
//         <p className='sm:w-1/3 text-center text-sm'>
//             Simple Browse Through Our Extensive List Of Trusted Doctors, Schedula Your Appointment Hassle-Free.
//         </p> 
//         <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
//             {specialityData.map((item,index)=>(
//                 <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
//                     <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
//                     <p>{item.speciality}</p>
//                 </Link>
//             ))}
//         </div>     
//     </div>
//   )
// }

// export default SpecialityMenu





import React from 'react'
import {specialityData} from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
        <h1 className='text-3xl font-medium'>Find By Speciality</h1>
        <p className='sm:w-1/3 text-center text-sm'>
            Simple Browse Through Our Extensive List Of Trusted Doctors, Schedule Your Appointment Hassle-Free.
        </p>

        <div className='relative w-full pt-5'>
            {/* Fade gradient on the right - mobile only */}
            <div className='absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none sm:hidden' />

            <div className='flex sm:justify-center gap-4 w-full overflow-x-auto pb-4 px-4
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                {specialityData.map((item, index) => (
                    <Link
                        onClick={() => scrollTo(0, 0)}
                        className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-500'
                        key={index}
                        to={`/doctors/${item.speciality}`}
                    >
                        <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                        <p>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default SpecialityMenu
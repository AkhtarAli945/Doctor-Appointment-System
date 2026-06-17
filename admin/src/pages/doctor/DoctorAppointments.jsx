import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment
  } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)

    let age = today.getFullYear() - birthDate.getFullYear()

    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age
  }

  const months = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`
  }

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        {/* Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_1fr_3fr_1fr_1.5fr] py-3 px-6 border-b font-medium text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Rows */}
        {appointments.reverse().map((item, index) => (
          <div
            key={item._id}
            className='flex flex-wrap justify-between max-sm:gap-3 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_1fr_3fr_1fr_1.5fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
          >
            <p className='max-sm:hidden'>{index + 1}</p>

            {/* Patient */}
            <div className='flex items-center gap-2'>
              <img
                className='w-8 h-8 rounded-full object-cover'
                src={item.userData.image}
                alt={item.userData.name}
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Payment */}
            <p>{item.payment ? 'Online' : 'Cash'}</p>

            {/* Age */}
            <p className='max-sm:hidden'>
              {calculateAge(item.userData.dob)}
            </p>

            {/* Date & Time */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p>${item.amount}</p>

            {/* Action */}
            {item.cancelled ? (
              <p className='text-red-500 text-xs font-medium'>
                Cancelled
              </p>
            ) : item.isCompleted ? (
              <p className='text-green-500 text-xs font-medium'>
                Completed
              </p>
            ) : (
              <div className='flex items-center gap-2'>
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className='w-8 cursor-pointer'
                  src={assets.cancel_icon}
                  alt='Cancel Appointment'
                />

                <img
                  onClick={() => completeAppointment(item._id)}
                  className='w-8 cursor-pointer'
                  src={assets.tick_icon}
                  alt='Complete Appointment'
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments
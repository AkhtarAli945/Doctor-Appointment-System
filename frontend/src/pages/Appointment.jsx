import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');

  // Fetch doctor info
  useEffect(() => {
    const info = doctors.find(doc => doc._id === docId);
    setDocInfo(info);
  }, [doctors, docId]);

  // Generate slots and filter out already booked ones
  useEffect(() => {
    if (!docInfo) return;

    const today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();

      const slot_Date = day + '_' + month + '_' + year;

      let hour = 10;
      let timeSlots = [];

      while (hour < 22) {
        const dateTime = new Date(currentDate);
        const hrs = Math.floor(hour);
        const mins = (hour % 1) * 60;
        dateTime.setHours(hrs, mins, 0, 0);

        timeSlots.push({
          datetime: dateTime,
          time: dateTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          slotDate: slot_Date
        });

        hour += 0.5;
      }

      // ✅ Filter out already booked slots for this date
      const bookedTimes = docInfo.slots_booked?.[slot_Date] || [];
      const filteredSlots = timeSlots.filter(slot => !bookedTimes.includes(slot.time));

      slots.push(filteredSlots);
    }

    setDocSlots(slots);
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login To Book Appointment');
      return navigate('/login');
    }

    try {
      const data = docSlots[selectedDay][0].datetime;

      const day = data.getDate();
      const month = data.getMonth() + 1;
      const year = data.getFullYear();

      const slotDate = day + '_' + month + '_' + year;
      const slotTime = selectedTime;

      const { data: resData } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (resData.success) {
        toast.success(resData.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!docInfo)
    return <p className="text-center mt-10 text-gray-500">Loading doctor info...</p>;

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">

      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-xl shadow-md">
        <img
          className="w-full sm:w-64 md:w-72 lg:w-80 h-auto object-cover rounded-lg bg-indigo-50"
          src={docInfo.image}
          alt={docInfo.name}
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </h2>
          <p className="text-gray-600 mt-1">
            {docInfo.degree} - {docInfo.speciality}
          </p>
          <span className="inline-block mt-1 px-2 py-0.5 border text-xs rounded-full">
            {docInfo.experience}
          </span>
          <div className="mt-4">
            <h3 className="flex items-center gap-1 text-sm font-medium text-gray-900">
              About
              <img src={assets.info_icon} alt="Info" />
            </h3>
            <p className="text-gray-500 text-sm mt-1">{docInfo.about}</p>
          </div>
          <p className="mt-4 text-gray-700 font-medium">
            Appointment Fee:{' '}
            <span className="text-gray-900">
              {currencySymbol}{docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-8">
        <h3 className="text-gray-800 font-semibold mb-2">Booking Slots</h3>

        {/* Days */}
        <div className="flex gap-2 flex-wrap mb-4">
          {docSlots.map((daySlots, index) => (
            daySlots.length > 0 && (
              <button
                key={index}
                className={`px-4 py-2 rounded-xl border ${
                  selectedDay === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
                onClick={() => {
                  setSelectedDay(index);
                  setSelectedTime('');
                }}
              >
                {dayOfWeek[daySlots[0].datetime.getDay()]}{' '}
                {daySlots[0].datetime.getDate()}
              </button>
            )
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex gap-2 flex-wrap">
          {docSlots[selectedDay]?.length > 0
            ? docSlots[selectedDay].map((slot, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-xl border ${
                    selectedTime === slot.time
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                  onClick={() => setSelectedTime(slot.time)}
                >
                  {slot.time}
                </button>
              ))
            : <p className="text-gray-400 text-sm">No slots available for this day</p>
          }
        </div>

        {/* Book Button */}
        <button
          onClick={bookAppointment}
          disabled={!selectedTime}
          className={`mt-6 px-6 py-3 rounded-full text-white font-medium ${
            selectedTime
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
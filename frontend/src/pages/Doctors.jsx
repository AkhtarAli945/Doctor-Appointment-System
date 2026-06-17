
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors: contextDoctors } = useContext(AppContext);  
  const [filterDoc, setFilterDoc] = useState([]);

  const specialties = [
    "All Doctors",
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ];

  // Filter doctors based on speciality
  useEffect(() => {
    if (speciality && speciality !== "All Doctors") {
      setFilterDoc(
        contextDoctors.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase())
      );
    } else {
      setFilterDoc(contextDoctors);
    }
  }, [speciality, contextDoctors]);

  // Optional: filter when clicking sidebar (without changing URL)
  const handleSpecialtyClick = (sp) => {
    if (sp === "All Doctors") {
      setFilterDoc(contextDoctors);
      navigate("/Doctors");
    } else {
      setFilterDoc(
        contextDoctors.filter(doc => doc.speciality.toLowerCase() === sp.toLowerCase())
      );
      navigate(`/Doctors/${sp}`);
    }
  };

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Browse Through Our Doctors</h1>
      <p className="text-center text-gray-600 mb-12">
        Find the best specialist doctors for your needs.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 flex flex-col gap-4">
          {specialties.map((sp, idx) => (
            <p
              key={idx}
              onClick={() => handleSpecialtyClick(sp)}
              className="cursor-pointer w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded hover:bg-blue-50 transition-all"
            >
              {sp}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Available</span>
                </div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;


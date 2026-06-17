import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [rel, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors?.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) =>
          doc.speciality === speciality && String(doc._id) !== String(docId),
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-6 my-16 text-gray-900 px-4 sm:px-10">
      <h1 className="text-3xl font-medium text-center">Related Doctors</h1>

      <p className="sm:w-1/2 text-center text-sm">
        Simply browse through similar specialists.
      </p>

      <div className="flex flex-wrap justify-center gap-6 pt-6">
        {rel.slice(0, 5).map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="w-52 border border-blue-200 rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
          >
            <img
              className="bg-blue-50 w-full h-40 object-cover"
              src={item.image}
              alt={item.name}
            />

            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>

             
              <p className="text-lg font-medium mt-2">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;

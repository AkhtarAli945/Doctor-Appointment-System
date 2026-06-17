import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useState } from "react";

const TopDoctor = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctor To Book</h1>

      <p className="sm:w-1/2 text-center text-sm">
        Simply Browse Through Our Extensive List Of Trusted Doctors.
      </p>

      {/* Responsive grid: 2 cols on small, 3 on medium, 5 on large */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6 pt-5 px-3 sm:px-0">
        {doctors?.slice(0, 5).map((item) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={item._id}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
          >
            <img
              className="bg-blue-50 w-full"
              src={item.image}
              alt={item.name}
            />

            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <p
                  className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-gray-500"} rounded-full`}
                ></p>
                <p>Available</p>
              </div>

              <p className="text-lg font-medium mt-2">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctor;

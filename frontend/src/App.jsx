
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className="mx-4 md:mx-[10%] min-h-screen flex flex-col">
      <ToastContainer/>
      <Navbar />

      {/* Main content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointment />} />
          {/* <Route path="/appointment/:DocId" element={<Appointment />} /> */}
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
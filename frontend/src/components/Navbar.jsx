
import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const {token,setToken, userData} = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  const navLinkClass = ({ isActive }) =>
    `py-1 ${isActive ? 'border-b-2 border-primary-500' : 'border-b-2 border-transparent'} hover:border-primary-500 transition-all duration-200`

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400'>
      <img className='w-44 cursor-pointer' src={assets.logo_icon} alt="" />

      <ul className='hidden md:flex items-center gap-5 font-medium'>
        <NavLink to='/' className={navLinkClass}><li className='py-1'>Home</li></NavLink>
        <NavLink to='/doctors' className={navLinkClass}><li className='py-1'>All Doctors</li></NavLink>
        <NavLink to='/about' className={navLinkClass}><li className='py-1'>About</li></NavLink>
        <NavLink to='/contact' className={navLinkClass}><li className='py-1'>Contact</li></NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        { token && userData
          ? <div className='flex items-center gap-2 cursor-pointer relative group'>
              <img className="w-8 rounded-full" src={userData.image} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/myprofile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointment</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
          : <button onClick={() => navigate('/login')} className='bg-primary-500 text-white px-8 py-3 rounded-full font-light hidden md:block'>
              Create Account
            </button>
        }

        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* Mobile Menu */}
        {showMenu && (
          <div className='fixed w-full md:hidden top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all'>
            <div className='flex items-center justify-between px-5 py-6'>
              <img src={assets.logo_icon} alt="" />
              <img onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="close" className='w-6 cursor-pointer' />
            </div>
            <ul className='flex flex-col items-center gap-6 mt-5 font-medium text-base'>
              <NavLink to='/' onClick={() => setShowMenu(false)} className={navLinkClass}><li>Home</li></NavLink>
              <NavLink to='/doctors' onClick={() => setShowMenu(false)} className={navLinkClass}><li>All Doctors</li></NavLink>
              <NavLink to='/about' onClick={() => setShowMenu(false)} className={navLinkClass}><li>About</li></NavLink>
              <NavLink to='/contact' onClick={() => setShowMenu(false)} className={navLinkClass}><li>Contact</li></NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import logo from '../assets/LOGO.png'

const Navbar = () => {
  return (
    <div className='bg-linear-to-r from-[rgb(0,0,0)] to-[rgb(34,32,32)] p-2 sm:px-6 sm:py-3 mb-3'>
        <div className='flex gap-2 items-center'>
            <img src={logo} className='h-7 sm:h-12' />
            <p className='font-bold text-white sm:text-2xl'>QR Builder</p>
        </div>
    </div>
  )
}

export default Navbar
import { useContext } from 'react'
import logo from '../assets/LOGO.png'
import { Link } from 'react-router-dom'
import QrContext from '../context/QrContext'

const Navbar = () => {
  const { qrValue } = useContext(QrContext)
  return (
    <div className='bg-linear-to-r from-[rgb(0,0,0)] to-[rgb(34,32,32)] p-2 sm:px-6 sm:py-3 mb-3 flex justify-between items-center'>
      <div>
        <Link className='flex gap-2 items-center' to={'/'}>
          <img src={logo} className='h-7 sm:h-11 lg:h-10' />
          <p className='font-bold text-white sm:text-2xl'>QR Builder</p>
        </Link>
      </div>
      <div className='text-white font-bold mr-2 py-2'>
        {qrValue ? (
          <Link className='text-md sm:text-xl tracking-wider border-b-2 py-1 px-2 sm:px-5' to={'/Design_QR'}>Design QR</Link>
        ) : (
          <Link className='text-md sm:text-xl tracking-wider border-b-2 py-1 px-2 sm:px-5' to={'/'} onClick={(e) => { alert("Enter the Text or URL") }}>Design QR</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
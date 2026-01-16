import React, { useContext } from 'react'
import QRGenerator from './Pages/QRGenerator'
import Navbar from './component/Navbar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Design_QR from './Pages/Design_QR'
import QrContext from './context/QrContext'
import Footer  from './component/Footer'

const App = () => {
  const { qrValue } = useContext(QrContext)
  return (
    <>
      <Navbar className="fixed top-0 left-0 w-full z-50"/>
      <Routes>
        <Route path="/" element={<QRGenerator />} />
        <Route path="/Design_QR" element={qrValue ? <Design_QR /> : <Navigate to="/" replace/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
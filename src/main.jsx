import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import QrStates from './context/QRStates.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QrStates>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QrStates>
  </StrictMode>,
)

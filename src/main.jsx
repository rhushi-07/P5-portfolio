import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MobileScaleProvider } from './contexts/MobileScaleContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MobileScaleProvider>
        <App />
      </MobileScaleProvider>
    </BrowserRouter>
  </StrictMode>,
)

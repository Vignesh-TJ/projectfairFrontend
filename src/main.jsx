import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../src/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './context/ContextShare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
 
 <ContextShare> <App /></ContextShare>
  </BrowserRouter>
  </StrictMode>,
)

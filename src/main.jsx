import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { LocationProvider } from './context/AppContext.jsx'
import App from './App.jsx'
import './shared/styles/index.css'

createRoot(document.getElementById('root')).render(
  <LocationProvider>
    <Router>
      <App />
    </Router>
  </LocationProvider>
)

import './index.css';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LocationProvider } from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  <LocationProvider>
    <App className="app-container" />
  </LocationProvider>
)

import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './infrastructure/state/store.js';
import App from './App.jsx';
import './shared/styles/index.css';
import './shared/styles/main.scss';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

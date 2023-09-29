import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'; 
import store from './Redux/store/store'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

ReactDOM.render(
  <Provider store={store}> {/* Envuelve tu App con Provider y pasa la tienda como prop */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

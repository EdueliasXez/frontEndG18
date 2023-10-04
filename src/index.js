import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'; 
import store from './Redux/store/store'; 
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

ReactDOM.render(
  <Provider store={store}> {/* Envuelve tu App con Provider y pasa la tienda como prop */}
    <React.StrictMode>
    <Auth0Provider
    domain="dev-6x7sndxqkamg3ply.us.auth0.com"
    clientId="PjZFCSyHmlMfWljjXP3HhN6nidtljWJN"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

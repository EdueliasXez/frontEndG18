import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'; 
import { store, persistor } from './Redux/store/store';
import { Auth0Provider } from '@auth0/auth0-react';
import { PersistGate } from 'redux-persist/integration/react'; // Importa PersistGate
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

ReactDOM.render(
  <Provider store={store}> 
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}> 
        <Auth0Provider
          domain="dev-6x7sndxqkamg3ply.us.auth0.com"
          clientId="PjZFCSyHmlMfWljjXP3HhN6nidtljWJN"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <App />
        </Auth0Provider>
      </PersistGate>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

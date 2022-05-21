import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from "./Redux/Store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/authContext';
// import { defineConfig, loadEnv } from 'vite';
//import VITE_AUTH0_DOMAIN from './env  '
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        
          <AuthProvider>
          <App />
          </AuthProvider>
        
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
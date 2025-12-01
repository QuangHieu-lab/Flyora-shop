import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Thêm dòng này
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthCartProvider } from './context/AuthCartContext';
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthCartProvider>
        <App />
        <Toaster
          position="top-center"
          reverseOrder={false} 
          toastOptions={{
            className: 'bg-gray-800 text-white',
            style: {
              fontSize: '16px',
              padding: '10px 20px',     
              borderRadius: '8px',
            },
          }}
        />  
         
      </AuthCartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();

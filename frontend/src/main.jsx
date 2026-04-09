import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ShopContextProvider } from './context/ShopContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Replace this with your actual Google Client ID from Google Cloud Console
// https://console.cloud.google.com -> APIs & Services -> Credentials -> OAuth 2.0 Client IDs
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.jsx'
import './responsive.css'
import { Provider } from 'react-redux'
import { persistedStore, store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'


const client = new QueryClient()

const googleMapsScript = document.createElement('script');
googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_GEOCODING_GOOGLE_KEY}&libraries=places`;
googleMapsScript.async = true;
document.head.appendChild(googleMapsScript);


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
)

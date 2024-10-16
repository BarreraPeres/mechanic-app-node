import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'


const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
)

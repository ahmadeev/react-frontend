import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from "./components/utils/AuthProvider.jsx";

createRoot(document.getElementById('root')).render(
    // вероятно, стрикт мод мешает вебсокетам (не было проверено)
/*  <StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </StrictMode>,*/

    <AuthProvider>
        <App />
    </AuthProvider>
)

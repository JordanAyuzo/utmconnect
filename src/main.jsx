import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//tema
import "primereact/resources/themes/lara-light-indigo/theme.css";

//núcleo
import "primereact/resources/primereact.min.css";

//iconos
import "primeicons/primeicons.css";
        


import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

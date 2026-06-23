import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <BrowserRouter basename="/final-fantasy-12-TZA-Interactive-map-react/">
        <App />
    </BrowserRouter>

)

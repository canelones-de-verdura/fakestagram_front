/* Functions */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";

/* Modules */
import App from './App.jsx'

/* Styles */
import "./styles/index.css"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <App />
        </Router>
    </StrictMode>,
)

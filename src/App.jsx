/* Functions */
import { Routes, Route, Navigate } from 'react-router-dom'

/* Pages */
import Login from './Pages/Login'
import Register from './Pages/Register'
import Feed from './Pages/Feed'

/* Styles */
import "./App.css"

function App() {
    return (
        <>
            <Routes>
                <Route path="/"
                    element={
                        localStorage.getItem("user") === null ? <Navigate to="/login" /> : <Navigate to={"/feed"} />
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/feed" element={<Feed />} />
            </Routes>
        </>
    );
}

export default App

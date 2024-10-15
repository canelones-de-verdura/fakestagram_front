/* Functions */
import { Routes, Route } from 'react-router-dom'

/* Pages */
import Login from './Pages/Login'
import Register from './Pages/Register'

/* Contexts */
import { UserContextManager } from './Contexts/UserContext'

/* Styles */
import "./App.css"

function App() {

    return (
        <>
            <UserContextManager>
                <Routes>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />
                </Routes>
            </UserContextManager>
        </>
    )
}

export default App

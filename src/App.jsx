/* Functions */
import { Routes, Route } from 'react-router-dom'

/* Pages */
import Login from './Pages/Login'
import Register from './Pages/Register'

/* Contexts */
import { SessionContextManager } from './Contexts/SessionContext'

/* Styles */
import "./App.css"

function App() {

    return (
        <>
            <SessionContextManager>
                <Routes>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />
                </Routes>
            </SessionContextManager>
        </>
    )
}

export default App

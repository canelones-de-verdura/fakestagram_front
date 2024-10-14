/* Functions */
import { Routes, Route } from 'react-router-dom'

/* Pages */
import Login from './Pages/Login'

/* Contexts */
import { UserContextManager } from './Contexts/UserContext'
import { UrlContextManager } from './Contexts/UrlContext'

/* Styles */
import "./App.css"
import Register from './Pages/Register'

function App() {

    return (
        <>
            <UrlContextManager>
            <UserContextManager>
                <Routes>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />
                </Routes>
            </UserContextManager>
            </UrlContextManager>
        </>
    )
}

export default App

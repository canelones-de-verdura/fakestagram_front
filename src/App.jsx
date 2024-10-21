/* Functions */
import { Routes, Route } from 'react-router-dom'

/* Pages */
import Login from './Pages/Login'
import Register from './Pages/Register'
import Feed from './Pages/Feed'

/* Contexts */
import { SessionContextManager } from './Contexts/SessionContext'

/* Styles */
import "./styles/App.css"

function App() {

    return (
        <>
            <SessionContextManager>
                <Routes>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />
                    <Route path={"/feed"} element={<Feed />} />
                </Routes>
            </SessionContextManager>
        </>
    )
}

export default App

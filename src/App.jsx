/* Functions */
import { Routes, Route } from 'react-router-dom'

/* Pages */
import Login from './Pages/Login'
import Register from './Pages/Register'
import UserProfile from './Pages/UserProfile/UserProfile'
import Feed from './Pages/Feed'

/* Contexts */
import { SessionContextManager } from './Contexts/SessionContext'

/* Styles */
import "./styles/App.css"

function App() {
    //Usuario de Prueba para el componente UserProfile
    const user = {
        username: 'Gero',
        name: 'Geronimo Benavides',
        bio: 'Streamer. Maestro. Leyenda italiana.',
        profilePicture: 'data:image/jpeg;base64,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',
        posts: [
          { imageUrl: 'https://th.bing.com/th/id/OIP.rKHSv0jkBYIISw4XZCtwyQAAAA?w=168&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
          { imageUrl: 'https://th.bing.com/th/id/OIP.JdJREErc-ojJcXM_PUr5YgAAAA?w=188&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
          { imageUrl: 'https://th.bing.com/th/id/OIP.8gY2xtsX_p2QAmSO42x1dAHaEK?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
          { imageUrl: 'https://th.bing.com/th/id/OIP.Sr7Ejx6eVLqmX1hDEQJ7YgHaE8?w=256&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
        ],
        followers: 200,
        following: 150,
      };
      
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

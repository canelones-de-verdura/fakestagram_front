/* Functions */
import { useState } from "react";
import { Link } from "react-router-dom";

/* Components */
import InputComponent from "../Components/InputComponent";

/* Services */
import AuthService from "../Services/AuthService";

/* Styles */
import "./Login.css";

function Register() {
    // Credenciales
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("")

    // Mensaje de error
    const [isHidden, setHidden] = useState(true);

    const reg = async () => {
        const user = await AuthService.register(username, email, passwd);

        if (user.code === 400) { // El usuario existe
            setHidden(false);
        } else {
            // TODO
            // Manejar la lógica de la sesión, redirección, etc.
            setHidden(true);
            console.log(user.data);
        }
    }

    return (
        <>
            <div className="login-card">
                {/* ACÁ VA EL ÍCONO DE LA APP */}
                <InputComponent description={"Username"} recoverInput={setUsername} />
                <InputComponent description={"Email"} recoverInput={setEmail} />
                <InputComponent description={"Password"} recoverInput={setPasswd} />

                <p hidden={isHidden} className="little-text error">User already exists.</p>

                <button onClick={reg}>Sign up</button>
                <p className="little-text">Already have an account? <Link to={"/login"}>Log in</Link>.</p>
            </div>
        </>
    );
}

export default Register;

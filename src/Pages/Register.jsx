/* Functions */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Components */
import SimpleTextInputComponent from "../Components/SimpleTextInputComponent";
import EmailInputComponent from "../Components/EmailInputComponent";
import PasswordInputComponent from "../Components/PasswordInputComponent";

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

    // Para redireccionar
    const navigate = useNavigate();

    const reg = async () => {
        const user = await AuthService.register(username, email, passwd);

        if (user.code === 400) { // El usuario existe
            setHidden(false);
        } else {
            setHidden(true);
            navigate("/login");
        }
    }

    return (
        <>
            <div className="login-card">
                {/* ACÁ VA EL ÍCONO DE LA APP */}
                <SimpleTextInputComponent description="Username" recoverInput={setUsername} />
                <EmailInputComponent recoverInput={setEmail} />
                <PasswordInputComponent recoverInput={setPasswd} />

                <p hidden={isHidden} className="little-text error">User already exists.</p>

                <button onClick={reg}>Sign up</button>
                <p className="little-text">Already have an account? <Link to={"/login"}>Log in</Link>.</p>
            </div>
        </>
    );
}

export default Register;

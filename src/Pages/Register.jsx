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
    const [err_msg, setErrorMsg] = useState("")
    const [isHidden, setHidden] = useState(true);

    // Para redireccionar
    const navigate = useNavigate();

    const reg = async () => {
        if (username === "" || email === "" || passwd === "") {
            setErrorMsg("Fields can't be left empty.");
            setHidden(false);
            return;
        }

        setErrorMsg("");
        setHidden(true);

        const user = await AuthService.register(username, email, passwd);

        if (user.code === 400) { // El usuario existe
            setErrorMsg("User already exists.");
            setHidden(false);
        } else {
            setHidden(true);
            navigate("/login");
        }
    }

    return (
        <>
            <div className="login-card">
                <img src="src/assets/logo.jpg" alt="logo" className="login-logo" />
                <h1 className="title">FAKESTRAGRAM</h1>
                <SimpleTextInputComponent description="Username" recoverInput={setUsername} />
                <EmailInputComponent recoverInput={setEmail} />
                <PasswordInputComponent recoverInput={setPasswd} validate={true} />

                <p hidden={isHidden} className="little-text error">{err_msg}</p>

                <button className="button-register" onClick={reg}>Sign up</button>
                <p className="little-text">Already have an account? <Link to={"/login"}>Log in</Link>.</p>
            </div>
        </>
    );
}

export default Register;

/* Functions */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Components */
import EmailInputComponent from "../Components/EmailInputComponent";
import PasswordInputComponent from "../Components/PasswordInputComponent";

/* Services */
import AuthService from "../Services/AuthService";

/* Styles */
import "./Login.css";

function Login() {
    // Credenciales
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");

    // Mensaje de error en la tarjeta
    const [err_msg, setErrorMsg] = useState("")
    const [isHidden, setHidden] = useState(true);

    // Para redireccionar
    const navigate = useNavigate();

    const log = async () => {
        if (email === "" || passwd === "") {
            setErrorMsg("Fields can't be left empty.");
            setHidden(false);
            return;
        }

        setErrorMsg("");
        setHidden(true);

        const user = await AuthService.login(email, passwd);

        if (user.code === 401) { // Falló el login
            setErrorMsg("Invalid username or password.");
            setHidden(false);
        } else {
            setHidden(true);
            localStorage.setItem("user", JSON.stringify(user.data));
            //session.start_session(user.data);

            // Redireccionamos
            navigate("/feed");
        }
    }

    useEffect(() => {
        document.body.classList.add("login-background");
        document.getElementById("root").classList.add("login-root");
        return () => {
            document.body.classList.remove("login-background");
            document.getElementById("root").classList.remove("login-root");
        };
    }, []);

    return (
        <>
            <div className="login-card">
                <img src="src/Assets/logo.jpg" alt="logo" className="login-logo" />
                <h1 className="title">FAKESTRAGRAM</h1>
                <EmailInputComponent recoverInput={setEmail} />
                <PasswordInputComponent recoverInput={setPasswd} validate={false} />

                <p hidden={isHidden} className="little-text error">{err_msg}</p>

                <button className="button-login" onClick={log}>Log in</button>
                <p className="little-text">Don't have an account? Create one <Link to={"/register"} className="here">here</Link>.</p>
            </div>
        </>
    );
}

export default Login;

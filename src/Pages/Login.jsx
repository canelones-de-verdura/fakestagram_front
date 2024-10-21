/* Functions */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Components */
import EmailInputComponent from "../Components/EmailInputComponent";
import PasswordInputComponent from "../Components/PasswordInputComponent";

/* Services */
import AuthService from "../Services/AuthService";

/* Styles */
import "./Login.css";
import { SessionContext } from "../Contexts/SessionContext";

function Login() {
    // Credenciales
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");

    // Mensaje de error en la tarjeta
    const [isHidden, setHidden] = useState(true);

    // User
    const session = useContext(SessionContext);

    // Para redireccionar
    const navigate = useNavigate();

    const log = async () => {
        if (email === "" || passwd === "")
            return;

        const user = await AuthService.login(email, passwd);

        if (user.code === 401) { // Falló el login
            setHidden(false);
        } else {
            setHidden(true);
            session.start_session(user.data);

            // Redireccionamos
            navigate("/");
        }
    }

    return (
        <>
            <div className="login-card">
                {/* ACÁ VA EL ÍCONO DE LA APP */}
                <EmailInputComponent recoverInput={setEmail} />
                <PasswordInputComponent recoverInput={setPasswd} />

                <p hidden={isHidden} className="little-text error">Invalid username or password.</p>

                <button onClick={log}>Log in</button>
                <p className="little-text">Don't have an account? Create one <Link to={"/register"}>here</Link>.</p>
            </div>
        </>
    );
}

export default Login;

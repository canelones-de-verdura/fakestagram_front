/* Functions */
import { useState } from "react";
import { Link } from "react-router-dom";

/* Components */
import InputComponent from "../Components/InputComponent";

/* Services */
import AuthService from "../Services/AuthService";

/* Styles */
import "./Login.css";

function Login() {
    // Credenciales
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");

    // Mensaje de error en la tarjeta
    const [isHidden, setHidden] = useState(true);

    const log = async () => {
        const user = await AuthService.login(email, passwd);

        if (user.code === 401) { // Falló el login
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
                <InputComponent description={"Email"} recoverInput={setEmail} />
                <InputComponent description={"Password"} recoverInput={setPasswd} />

                <p hidden={isHidden} className="little-text error">Invalid username or password.</p>

                <button onClick={log}>Log in</button>
                <p className="little-text">Don't have an account? Create one <Link to={"/register"}>here</Link>.</p>
            </div>
        </>
    );
}

export default Login;

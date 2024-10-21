/* Functions */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Components */
import InputComponent from "../Components/InputComponent";

/* Services */
import AuthService from "../Services/AuthService";

/* Styles */
import "../styles/Login-styles.css";
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
          <img src="src/assets/logo.jpg" alt="logo" className="login-logo" />
          <h1 className="title">FAKESTRAGRAM</h1>
          <InputComponent description={"Email"} recoverInput={setEmail} />
          <InputComponent description={"Password"} recoverInput={setPasswd} />

          <p hidden={isHidden} className="little-text error">
            Invalid username or password.
          </p>

          <button onClick={log}>Log in</button>
          <p className="little-text">
            Don't have an account? Create one <Link to={"/register"}>here</Link>
            .
          </p>
        </div>
      </>
    );
}

export default Login;

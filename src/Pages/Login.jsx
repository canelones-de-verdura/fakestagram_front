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
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("")

    const log = async () => {
        const user = await AuthService.login(email, passwd);

        console.log(user);
    }

    return (
        <>
            <div className="login-card">
                {/* ACÁ VA EL ÍCONO DE LA APP */}
                <InputComponent description={"Email"} recoverInput={setEmail} />
                <InputComponent description={"Password"} recoverInput={setPasswd} />
                <button onClick={log}>Log in</button>
                <p className="little-text">Don't have an account? Create one <Link to={"/register"}>here</Link>.</p>
            </div>
        </>
    );
}

export default Login;

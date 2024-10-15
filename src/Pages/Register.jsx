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
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("")

    const reg = async () => {
        const user = await AuthService.register(username, email, passwd);

        console.log(user);
    }

    return (
        <>
            <div className="login-card">
                {/* ACÁ VA EL ÍCONO DE LA APP */}
                <InputComponent description={"Username"} recoverInput={setUsername} />
                <InputComponent description={"Email"} recoverInput={setEmail} />
                <InputComponent description={"Password"} recoverInput={setPasswd} />
                <button onClick={reg}>Sign up</button>
                <p className="little-text">Already have an account? <Link to={"/login"}>Log in</Link>.</p>
            </div>
        </>
    );
}

export default Register;

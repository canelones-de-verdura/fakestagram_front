import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import InputComponent from "../Components/InputComponent";
import { UrlContext } from "../Contexts/UrlContext";

import "./Login.css";
import { login } from "../Services/Auth";

function Login() {
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("")

    const url = useContext(UrlContext);

    const log = async () => {
        const user = await login(url, email, passwd);

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

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import InputComponent from "../Components/InputComponent";
import { UrlContext } from "../Contexts/UrlContext";

import "./Login.css";
import { register } from "../Services/Auth";

function Register() {
    const [usrname, setUsrname] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("")

    const url = useContext(UrlContext);

    const reg = async () => {
        const user = await register(url, usrname, email, passwd);

        console.log(user);
    }

    return (
        <>
            <div className="login-card">
                {/* ACÁ VA EL ÍCONO DE LA APP */}
                <InputComponent description={"Username"} recoverInput={setUsrname} />
                <InputComponent description={"Email"} recoverInput={setEmail} />
                <InputComponent description={"Password"} recoverInput={setPasswd} />
                <button onClick={reg}>Sign up</button>
                <p className="little-text">Already have an account? <Link to={"/login"}>Log in</Link>.</p>
            </div>
        </>
    );
}

export default Register;

import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";

function PasswordInputComponent({ description, placeholder, recoverInput, validate }) {
    // Mensaje de error en la tarjeta
    const [isHidden, setHidden] = useState(true);

    // Descripción
    const [desc, setDesc] = useState("Password");

    const handleChange = (event) => {
        const input = event.target.value;
        recoverInput(input);
        if (validate) validatePassword(input);
    };

    const validatePassword = (input) => {
        if (input.length < 8 && input !== "")
            setHidden(false);
        else
            setHidden(true);
    }

    useEffect(() => {
        if (description !== undefined)
            setDesc(description);
    }, []);

    return (
        <div className="password-input-component">
            <InputComponent
                description={desc}
                type="password"
                placeholder={placeholder}
                handleChange={handleChange}
                min_length={3}
                max_length={30}
                is_required={true}
            />

            <p hidden={isHidden} className="little-text error">Password must be 8 characters or longer.</p>
        </div>
    );
};

export default PasswordInputComponent;

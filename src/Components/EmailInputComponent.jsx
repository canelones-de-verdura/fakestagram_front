import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";

function EmailInputComponent({ description, placeholder, recoverInput }) {
    // Mensaje de error en la tarjeta
    const [isHidden, setHidden] = useState(true);

    // Descripción
    const [desc, setDesc] = useState("Email");

    const handleChange = (event) => {
        const input = event.target.value;
        recoverInput(input);
        validateEmail(input);
    };

    const validateEmail = (input) => {
        const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(input) && input !== "")
            setHidden(false);
        else
            setHidden(true);
    }

    useEffect(() => {
        if (description !== undefined)
            setDesc(description);
    }, []);

    return (
        <div className="email-input-component">
            <InputComponent
                description={desc}
                type="email"
                placeholder={placeholder}
                handleChange={handleChange}
                min_length={3}
                max_length={30}
                is_required={true}
            />

            <p hidden={isHidden} className="little-text error">Email might not be valid.</p>
        </div>
    );
};

export default EmailInputComponent;

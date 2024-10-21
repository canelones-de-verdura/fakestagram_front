import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";

function PasswordInputComponent({ description, placeholder, recoverInput }) {
    const handleChange = (event) => {
        recoverInput(event.target.value);
    };

    const [desc, setDesc] = useState("Password");
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
        </div>
    );
};

export default PasswordInputComponent;

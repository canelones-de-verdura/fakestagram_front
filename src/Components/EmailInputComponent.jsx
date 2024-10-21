import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";

function EmailInputComponent({ description, placeholder, recoverInput }) {
    const handleChange = (event) => {
        recoverInput(event.target.value);
    };

    const [desc, setDesc] = useState("Email");
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
        </div>
    );
};

export default EmailInputComponent;

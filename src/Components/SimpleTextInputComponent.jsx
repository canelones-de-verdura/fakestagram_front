import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";

function SimpleTextInputComponent({ description, placeholder, recoverInput }) {
    const handleChange = (event) => {
        recoverInput(event.target.value);
    };

    const [desc, setDesc] = useState("PLACEHOLDER - Falta descripción");
    useEffect(() => {
        if (description !== undefined)
            setDesc(description);
    }, []);

    return (
        <div className="simpletext-input-component">
            <InputComponent
                description={desc}
                type="text"
                placeholder={placeholder}
                handleChange={handleChange}
                min_length={3}
                max_length={30}
                is_required={true}
            />
        </div>
    );
};

export default SimpleTextInputComponent;

import "./InputComponent.css";

function InputComponent({ description, placeholder, handleChange, type, min_length, max_length, is_required }) {
    return (
        <div className="input-component">
            <p className="input-description">{description}</p>
            <input
                className="input-field"
                type={type}
                onChange={handleChange}
                minLength={min_length}
                maxLength={max_length}
                required={is_required}
            >{placeholder}</input>
        </div>
    );
};

export default InputComponent;

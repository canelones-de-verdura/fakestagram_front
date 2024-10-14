import "./InputComponent.css";

function InputComponent({ description, placeholder, recoverInput }) {
    const handleChange = (event) => {
        recoverInput(event.target.value);
    }

    return (
        <div className="input-component">
            <p className="input-description">{description}</p>
            <input className="input-field" onChange={handleChange}>{placeholder}</input>
        </div>
    );
}

export default InputComponent;

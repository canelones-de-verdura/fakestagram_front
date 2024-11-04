import "./ImageComponent.css"

function ImageComponent({ image, alt_text }) {
    return (
    <div className="imgComponent">
            <img className="imgInComponent" src={image} alt={`${alt_text} image`} />
    </div>
    );
}

export default ImageComponent;

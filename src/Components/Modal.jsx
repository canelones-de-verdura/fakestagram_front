import React from "react";
import "./Modal.css";

export default function Modal({ content, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {content}
            </div>
        </div>
    );
};

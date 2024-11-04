import Modal from 'react-modal';

import "./PostModal.css";

function PostModal({ open, setOpen }) {
    const afterOpenModal = () => {
    };

    return (
        <>
            <div>
                <Modal
                    isOpen={open}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={() => setOpen(false)}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                    className="Modal"
                    overlayClassName="Overlay"
                >
                </Modal>
            </div>
        </>
    );
}

export default PostModal;

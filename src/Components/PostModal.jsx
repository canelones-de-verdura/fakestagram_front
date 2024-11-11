import Modal from 'react-modal';

import "./PostModal.css";
import CommentListComponent from './CommentListComponent';
import { useState } from 'react';
import CommentService from '../Services/CommentService';


function PostModal({ open, setOpen, comments, updateComments }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [inputValue, setInputValue] = useState("");

    const afterOpenModal = () => {
    };

    const updateComment = (event) => {
        setInputValue(event.target.value);
    };

    const sendComment = async () => {
        const res = await CommentService.comment_post(inputValue, comments.postID, user.token);

        if (res.code === 201) {
            updateComments((prevState) => ({
                ...prevState,
                comments: [...prevState.comments, res.data._id],
            }))

            setInputValue("");
        }
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
                    <CommentListComponent comments={comments.comments} />
                    <div className='inputcontainer'>
                        <input className="input" type="text" onChange={updateComment} maxLength="50" placeholder='Escribe un comentario...' value={inputValue} />
                        <span className="send material-symbols-outlined" onClick={sendComment}>
                            send
                        </span>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default PostModal;

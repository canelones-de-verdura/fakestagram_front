import "./PostModal.css";
import CommentListComponent from './CommentListComponent';
import { useState } from 'react';
import CommentService from '../Services/CommentService';
import MapComment from '../Models/CommentModel';


function PostModal({ comments, updateComments }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [inputValue, setInputValue] = useState("");

    const updateComment = (event) => {
        setInputValue(event.target.value);
    };

    const sendComment = async () => {
        const res = await CommentService.comment_post(inputValue, comments.postID, user.token);

        if (res.code === 201) {
            updateComments((prevState) => ({
                ...prevState,
                comments: [...prevState.comments, MapComment(res.data)],
            }))

            setInputValue("");
        }
    };

    return (
        <>
            <div>
                <CommentListComponent comments={comments.comments} />
                <div className='inputcontainer'>
                    <input className="input" type="text" onChange={updateComment} maxLength="50" placeholder='Escribe un comentario...' value={inputValue} />
                    <span className="send material-symbols-outlined" onClick={sendComment}>
                        send
                    </span>
                </div>
            </div>
        </>
    );
}

export default PostModal;

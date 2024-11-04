import "./CommentComponent.css"

function CommentComponent({ user, comment }) {
    return (
        <>
            <span><b>{user}</b> {comment}</span>
        </>
    );
}

export default CommentComponent;

import CommentComponent from "./CommentComponent";
import "./CommentListComponent.css"

function CommentListComponent({ comments }) {
    return (
        <>
            <div className="list" >
                {comments.map((comment, key) => {
                    return <CommentComponent key={key} comment={comment} />
                })}
            </div>
        </>
    );
}

export default CommentListComponent;

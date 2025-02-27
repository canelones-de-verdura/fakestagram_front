function MapComment(comment) {
    return {
        content: comment.content,
        user_id: comment.user._id === undefined ? comment.user : comment.user._id,
    }
};

export default MapComment;

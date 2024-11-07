import { useEffect, useState } from "react";
import CommentService from "../Services/CommentService";
import origin_url from "../Services/Origin";
import ProfilePhoto from "./ProfilePhoto";

import "./CommentComponent.css";
import ProfileService from "../Services/ProfileService";

function CommentComponent({ comment }) {
    // recuperamos usuario actual
    const user = JSON.parse(localStorage.getItem("user"));

    const [current_comment, setCurrentComment] = useState(comment); // por las dudas guradamos acá

    console.log(comment)
    //useEffect(() => {
        //  const getComment = async () => {
        //    const comm = await CommentService.get_comments(comment, user.token);
        //
        //    if (comm.code === 200) setCurrentComment(comm.data);
        //  };
        //
        //  getComment();
    //}, []);

    if (!current_comment) return; // como me revienta tener que hacer esto

    return (
        <div className="comment">
            <ProfilePhoto
                profilePicture={user.profilePicture}
                username={user.username}
            />
            <span>
                <b>{current_comment.user.username}</b> {current_comment.content}
            </span>
        </div>
    );
}

export default CommentComponent;

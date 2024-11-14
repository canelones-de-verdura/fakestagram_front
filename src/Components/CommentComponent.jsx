import { useEffect, useState } from "react";
import CommentService from "../Services/CommentService";
import origin_url from "../Services/Origin";
import ProfilePhoto from "./ProfilePhoto";

import "./CommentComponent.css";
import ProfileService from "../Services/ProfileService";

function CommentComponent({ comment }) {
    // recuperamos usuario actual
    const user = JSON.parse(localStorage.getItem("user"));

    const [current_user, setCurrentUser] = useState(comment); // por las dudas guradamos acá

    useEffect(() => {
        const getUser = async () => {
            const usr = await ProfileService.get_profile(comment.user_id, user.token);

            if (usr.code === 200) setCurrentUser(usr.data);
        };

        getUser();

        //  const getComment = async () => {
        //    const comm = await CommentService.get_comments(comment, user.token);
        //
        //    if (comm.code === 200) setCurrentComment(comm.data);
        //  };
        //
        //  getComment();
    }, []);

    if (!current_user || !current_user.user) return; // como me revienta tener que hacer esto

    return (
        <div className="comment">       
            <span>
                <b>{current_user.user.username}</b> {comment.content}
            </span>
        </div>
    );
}

export default CommentComponent;

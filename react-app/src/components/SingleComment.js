import { useState } from "react";
import DeleteCommentModal from "./DeleteCommentModal/DeleteCommentModal";
import EditCommentForm from "./EditCommentForm";
import "./Comments.css";

const SingleComment = ({ comment, post, sessionUser }) => {
  const [editForm, setEditForm] = useState(false);

  return (
    <>
      {comment.post_id === post.id && (
        <li className="all-comments" key={comment.id}>
          <p>{comment.body}</p>
          <img src={comment.image_url}></img>
          {sessionUser.id === comment.user_id && (
            <div>
              <button onClick={(e) => setEditForm(true)}>Edit</button>
            </div>
          )}
          {sessionUser && editForm && (
            <EditCommentForm
              post={post}
              comment={comment}
              setEditForm={setEditForm}
            />
          )}
          {sessionUser.id === comment.user_id && (
            <DeleteCommentModal comment={comment} />
          )}
        </li>
      )}
    </>
  );
};

export default SingleComment;

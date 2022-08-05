import { useState } from "react";
import DeleteCommentModal from "./DeleteCommentModal/DeleteCommentModal";
import EditCommentForm from "./EditCommentForm";
import { useEffect } from "react";
import "./Comments.css";

const SingleComment = ({ comment, post, sessionUser }) => {
  const [editForm, setEditForm] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!comment.user_id) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${comment.user_id}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [comment.user_id]);

  if (!user) {
    return null;
  }
  return (
    <>
      {comment.post_id === post.id && (
        <li className="all-comments" key={comment.id}>
          <h3>
            {user.first_name} {user.last_name}
          </h3>
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

import { useState } from "react";
import DeleteCommentModal from "./DeleteCommentModal/DeleteCommentModal";
import EditCommentForm from "./EditCommentForm";
import { useEffect } from "react";
import "./Comments.css";

const SingleComment = ({ comment, post, sessionUser }) => {
  const [editForm, setEditForm] = useState(false);
  const [commentOptions, setCommentOptions] = useState("");
  const [user, setUser] = useState({});
  const [commentHover, setCommentHover] = useState(false);

  const handleCommentOptions = (e) => {
    e.preventDefault();
    setCommentOptions((current) => !current);
  };

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
        <li key={comment.id}>
          <img
            src={user.profile_pic}
            className="profile-picture-comments comment-profile"
          />
          <div
            className="all-comments"
            onMouseEnter={() => setCommentHover(true)}
            onMouseLeave={() => setCommentHover(false)}
          >
            <div className="name-and-comment-container">
              <p className="comment-names">
                {user.first_name} {user.last_name}
              </p>
              <p className="comment-body">{comment.body}</p>
              {comment.image_url && (
                <img className="comment-image" src={comment.image_url}></img>
              )}
            </div>
            {sessionUser.id === comment.user_id && commentHover && (
              <i
                className="fa-solid fa-ellipsis comments-ellipsis"
                onClick={handleCommentOptions}
              ></i>
            )}
          </div>
          {sessionUser.id === comment.user_id && commentOptions && (
            <div>
              <button onClick={(e) => setEditForm(true)}>Edit</button>
            </div>
          )}
          {sessionUser && editForm && commentOptions && (
            <EditCommentForm
              post={post}
              comment={comment}
              setEditForm={setEditForm}
            />
          )}
          {sessionUser.id === comment.user_id && commentOptions && (
            <DeleteCommentModal comment={comment} />
          )}
        </li>
      )}
    </>
  );
};

export default SingleComment;

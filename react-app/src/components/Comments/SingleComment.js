import { useState } from "react";
import DeleteCommentModal from "../DeleteCommentModal/DeleteCommentModal";
import { useEffect } from "react";
import "./Comments.css";
import EditCommentFormModal from "../EditCommentModal/EditCommentFormModal";
import { NavLink } from "react-router-dom";
import moment from "moment";

const SingleComment = ({ comment, post, sessionUser }) => {
  const [editForm, setEditForm] = useState(false);
  const [commentOptions, setCommentOptions] = useState(false);
  const [user, setUser] = useState({});
  const [commentHover, setCommentHover] = useState(false);

  const handleCommentOptions = (e) => {
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
        <div>
          <NavLink to={`${comment.user_id}`}>
            <img
              src={user.profile_pic}
              className="profile-picture-comments comment-profile"
            />
          </NavLink>
          <div
            className="all-comments"
            onMouseEnter={() => setCommentHover(true)}
            onMouseLeave={() => setCommentHover(false)}
          >
            <div className="name-and-comment-container">
              <NavLink to={`${comment.user_id}`}>
                <p className="comment-names">
                  {user.first_name} {user.last_name}
                </p>
              </NavLink>
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
          <p className="comment-time">{moment(comment.created_on).fromNow()}</p>
          {commentOptions && (
            <>
              <div className="edit-and-delete-comment">
                <EditCommentFormModal
                  handleCommentOptions={handleCommentOptions}
                  post={post}
                  comment={comment}
                  setEditForm={setEditForm}
                />

                <DeleteCommentModal
                  comment={comment}
                  handleCommentOptions={handleCommentOptions}
                />
              </div>
              <div
                className="overlay"
                onClick={() => setCommentOptions(false)}
              ></div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SingleComment;

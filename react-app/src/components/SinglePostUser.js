import React, { useState, useRef } from "react";
import EditPostFormModal from "./EditPostFormModal/EditPostFormModal";
import DeletePostModal from "./DeletePostModal/DeletePostModal";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { NavLink } from "react-router-dom";

const SinglePostUser = ({ post, sessionUser }) => {
  const [options, setOptions] = useState(false);

  const handleOptions = (e) => {
    setOptions((current) => !current);
  };

  return (
    <li className="post-container-user">
      <NavLink to={`/${post.user_id}`}>
        <img
          src={post.user?.profile_pic}
          className="profile-picture-nav post-profile single-post"
        />
      </NavLink>
      <NavLink to={`/${post.user_id}`}>
        <p className="posts-names">
          {post.user?.first_name} {post.user?.last_name}
        </p>
      </NavLink>
      {sessionUser.id === post.user_id && (
        <i
          className="fa-solid fa-ellipsis posts-ellipsis"
          onClick={handleOptions}
        ></i>
      )}
      {sessionUser.id === post.user_id && options && (
        <div className="edit-delete-post-container">
          <EditPostFormModal
            post={post}
            sessionUser={sessionUser}
            handleOptions={handleOptions}
          />
          <p className="p2">__________________________________</p>
          <DeletePostModal
            post={post}
            sessionUser={sessionUser}
            handleOptions={handleOptions}
          />
        </div>
      )}
      <p className={post.body.length < 35 ? "post-body-short" : "post-body"}>
        {post.body}
      </p>
      {post.image_url && (
        <img className="post-image" src={post.image_url}></img>
      )}
      <div className="likes-and-comments-amount">
        <p className="like-amount">You and others like this.</p>
        {post.comments.length > 0 && (
          <p className="comment-amount"> {post.comments.length} Comments</p>
        )}
      </div>
      <div className="likes-and-comments">
        <p className="like">
          <i className="fa-regular fa-thumbs-up"></i>Like
        </p>
        <p className="comment">
          <i className="fa-regular fa-message"></i>Comment
        </p>
      </div>

      <Comments post={post} />
      <CommentForm post={post} />
    </li>
  );
};

export default SinglePostUser;
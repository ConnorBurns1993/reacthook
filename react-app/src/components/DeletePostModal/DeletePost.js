import React from "react";
import { useDispatch } from "react-redux";
import { destroyPost } from "../../store/posts";

const DeletePost = ({ post, setShowModal }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(destroyPost(post?.id)).then(() => setShowModal(false));
  };

  return (
    <div className="delete-form">
      <h2 className="delete-h2">Delete?</h2>
      <p className="delete-p">
        Are you sure you want to delete your post? This action is irreversible.
      </p>
      <button className="delete-modal" onClick={handleSubmit}>
        Delete
      </button>
    </div>
  );
};

export default DeletePost;

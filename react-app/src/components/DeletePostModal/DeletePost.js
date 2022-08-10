import React from "react";
import { useDispatch } from "react-redux";
import { destroyPost } from "../../store/posts";
import "./Delete.css";

const DeletePost = ({ post, setShowModal, handleOptions }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(destroyPost(post?.id))
      .then(() => setShowModal(false))
      .then(() => handleOptions());
  };

  const handleCancel = () => {
    setShowModal(false);
    handleOptions();
  };

  return (
    <div className="delete-form">
      <h3 className="delete-h3">Delete?</h3>
      <p className="p4">
        ________________________________________________________________________________________
      </p>
      <p className="delete-p">
        Are you sure you want to delete your post? This action is irreversible.
      </p>
      <button className="cancel-delete" onClick={handleCancel}>
        Cancel
      </button>
      <button className="delete-post" onClick={handleSubmit}>
        Delete
      </button>
      <button className="delete-post-x" type="button" onClick={handleCancel}>
        <i className="fa-solid fa-x delete-x"></i>
      </button>
    </div>
  );
};

export default DeletePost;

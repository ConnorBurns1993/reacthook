import React from "react";
import { useDispatch } from "react-redux";
import { destroyComment } from "../../store/comments";

const DeleteComment = ({ comment, setDeleteForm, setShowModal }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(destroyComment(comment?.id)).then(() => setShowModal(false));
  };

  return (
    <div className="delete-form">
      <h2 className="delete-h2">Delete?</h2>
      <p className="delete-p">
        Are you sure you want to delete your comment? This action is
        irreversible.
      </p>
      <button className="delete-modal" onClick={handleSubmit}>
        Delete
      </button>
    </div>
  );
};

export default DeleteComment;

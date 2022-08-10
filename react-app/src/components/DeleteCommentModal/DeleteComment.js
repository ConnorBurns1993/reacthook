import React from "react";
import { useDispatch } from "react-redux";
import { destroyComment } from "../../store/comments";

const DeleteComment = ({ comment, setShowModal }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(destroyComment(comment?.id)).then(() => setShowModal(false));
  };

  return (
    <div className="delete-form">
      <h3 className="delete-h3">Delete?</h3>
      <p className="p4">
        ________________________________________________________________________________________
      </p>
      <p className="delete-p-comment">
        Are you sure you want to delete your comment? This action is
        irreversible.
      </p>
      <button className="cancel-delete" onClick={(e) => setShowModal(false)}>
        Cancel
      </button>
      <button className="delete-post" onClick={handleSubmit}>
        Delete
      </button>
      <button
        className="delete-post-x"
        type="button"
        onClick={(e) => setShowModal(false)}
      >
        <i className="fa-solid fa-x delete-x"></i>
      </button>
    </div>
  );
};

export default DeleteComment;

import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteComment from "./DeleteComment";

function DeleteCommentModal({ post, comment, handleCommentOptions }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  return (
    <>
      <button className="delete-comment-button" onClick={handleDelete}>
        Delete
      </button>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            handleCommentOptions();
          }}
        >
          <DeleteComment
            handleCommentOptions={handleCommentOptions}
            setShowModal={setShowModal}
            comment={comment}
            post={post}
          />
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;

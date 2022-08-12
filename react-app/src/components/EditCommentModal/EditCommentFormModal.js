import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCommentForm from "./EditCommentForm";

function EditCommentFormModal({
  post,
  handleCommentOptions,
  setEditForm,
  comment,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setEditForm(false);
  };

  return (
    <>
      <button
        className="edit-comment-button"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal && (
        <Modal>
          <EditCommentForm
            setEditForm={setEditForm}
            setShowModal={setShowModal}
            post={post}
            comment={comment}
            handleCommentOptions={handleCommentOptions}
          />
        </Modal>
      )}
    </>
  );
}

export default EditCommentFormModal;

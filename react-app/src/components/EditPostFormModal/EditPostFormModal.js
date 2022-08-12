import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPostForm from "./EditPostForm";

function EditPostFormModal({ post, sessionUser, handleOptions }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="edit-modal"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <i className="fa-solid fa-pencil"></i>Edit Post
      </button>
      {showModal && (
        <Modal>
          <EditPostForm
            handleOptions={handleOptions}
            sessionUser={sessionUser}
            setShowModal={setShowModal}
            post={post}
          />
        </Modal>
      )}
    </>
  );
}

export default EditPostFormModal;

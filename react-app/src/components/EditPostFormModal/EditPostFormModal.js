import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPostForm from "./EditPostForm";

function EditPostFormModal({ post, handleOptions, sessionUser }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-modal" onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-pencil"></i>Edit Post
      </button>
      {showModal && (
        <Modal>
          <EditPostForm
            sessionUser={sessionUser}
            setShowModal={setShowModal}
            post={post}
            handleOptions={handleOptions}
          />
        </Modal>
      )}
    </>
  );
}

export default EditPostFormModal;

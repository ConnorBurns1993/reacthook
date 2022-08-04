import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPostForm from "./EditPostForm";

function EditPostFormModal({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm setShowModal={setShowModal} post={post} />
        </Modal>
      )}
    </>
  );
}

export default EditPostFormModal;

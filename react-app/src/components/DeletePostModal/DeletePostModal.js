import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeletePost from "./DeletePost";

function DeletePostModal({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePost setShowModal={setShowModal} post={post} />
        </Modal>
      )}
    </>
  );
}

export default DeletePostModal;

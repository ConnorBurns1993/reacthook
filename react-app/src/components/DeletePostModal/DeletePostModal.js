import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeletePost from "./DeletePost";

function DeletePostModal({ post, handleOptions }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    handleOptions();
  };

  return (
    <>
      <button className="delete-modal" onClick={() => setShowModal(true)}>
        <i className="fa-regular fa-trash-can"></i>Move to Trash
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePost
            setShowModal={setShowModal}
            post={post}
            handleOptions={handleOptions}
          />
        </Modal>
      )}
    </>
  );
}

export default DeletePostModal;

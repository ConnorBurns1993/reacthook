import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";

function SignUpFormModal({ sessionUser }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="signup-splash" onClick={() => setShowModal(true)}>
        Create new account
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;

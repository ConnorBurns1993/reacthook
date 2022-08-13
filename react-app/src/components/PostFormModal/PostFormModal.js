import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal";
import PostForm from "./PostForm";

function PostFormModal({ sessionUser }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <NavLink to={`${sessionUser.id}`}>
        <img
          className="profile-picture-nav post-profile"
          src={sessionUser.profile_pic}
        />
      </NavLink>
      <button className="post-form" onClick={() => setShowModal(true)}>
        What's on your mind, {sessionUser?.first_name}?
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default PostFormModal;

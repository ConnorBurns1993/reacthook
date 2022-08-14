import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal";
import PostForm from "./PostForm";

function PostFormModalUser({ sessionUser, userId, user }) {
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
        {userId !== sessionUser.id.toString()
          ? `Write something to ${user?.first_name}...`
          : `What's on your mind?`}
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default PostFormModalUser;

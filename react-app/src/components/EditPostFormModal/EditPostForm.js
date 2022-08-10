import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../store/posts";
import "./EditPost.css";

function EditPostForm({ setShowModal, post, handleOptions, sessionUser }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState(post?.body);
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [view, setView] = useState("");
  const [imageUrl, setImageUrl] = useState(post?.image_url);
  const [errors, setErrors] = useState([]);

  const fileRef = useRef();

  const updateBody = (e) => setBody(e.target.value);

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    setView(URL.createObjectURL(file));
    setImage(file);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false);
    handleOptions();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("image", image);

    setImageLoading(true);

    const res = await fetch("/api/posts/post-image", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      const data = await res.json();
      setImageLoading(false);
      setShowModal(false);

      const updatedPost = {
        ...post,
        user_id: post.user_id,
        body,
        image_url: data.image,
      };

      console.log(updatedPost);

      await dispatch(updatePost(updatedPost))
        .then(() => setShowModal(false))
        .then(() => handleOptions())
        .then(() => setView(""))
        .catch(async (res) => {
          // const data = await res.json();
          // if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  return (
    <div className={view ? "edit-post-container-big" : "edit-post-container"}>
      <h3 className="edit-post">Edit post</h3>
      <p className="p3">
        ____________________________________________________________
      </p>
      <img
        className="profile-picture-nav edit-post-profile"
        src={sessionUser.profile_pic}
      />
      <p className="edit-names">
        {sessionUser.first_name} {sessionUser.last_name}
      </p>
      <form className="edit-post-form" onSubmit={(e) => handleSubmit(e)}>
        <button className="edit-x" onClick={(e) => handleCancel(e)}>
          <i className="fa-solid fa-x"></i>
        </button>
        <textarea
          className={body.length < 35 ? "edit-body-short" : "edit-body"}
          value={body}
          onChange={updateBody}
        ></textarea>
        <button
          type="button"
          className="comment-upload-button"
          id={view ? "edit-upload-big" : "edit-upload"}
          onClick={(e) => fileRef.current.click(e)}
        >
          <i className="fa-solid fa-camera"></i>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          id="comment-upload-photo"
          hidden
        />
        <div className={view ? "post-upload-div-big" : "post-upload-div"}>
          Add to your post
        </div>
        <button className={view ? "save-edit-big" : "save-edit"}>Save</button>
        {view && (
          <>
            <div className="edit-picture-border">
              <img className="edit-view" src={view} />
            </div>
            <button
              className="edit-upload-x"
              type="button"
              onClick={(e) => {
                setView("");
                setImage("");
              }}
            >
              <i className="fa-solid fa-x"></i>
            </button>
            {imageLoading && (
              <div>
                <img
                  className="image-loading"
                  src="https://flevix.com/wp-content/uploads/2019/07/Untitled-2.gif"
                ></img>
                <p>Posting</p>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
}
export default EditPostForm;

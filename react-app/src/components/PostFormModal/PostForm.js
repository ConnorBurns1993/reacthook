import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store/posts";
import "../Posts.css";

function PostForm({ setShowModal }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [view, setView] = useState("");
  const [errors, setErrors] = useState([]);

  const fileRef = useRef();

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    setView(URL.createObjectURL(file));
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const form = new FormData();
    form.append("image", image);

    setImageLoading(true);

    const res = await fetch("/api/posts/post-image", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      const imageData = await res.json();
      setImageLoading(false);
      setShowModal(false);

      const newPost = {
        user_id: sessionUser.id,
        body,
        image_url: imageData.image,
      };

      await dispatch(addPost(newPost))
        .then(() => {
          setView("");
        })
        .catch(async (res) => {
          const data = await res.json();
          console.log(data);
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  return (
    <div className={view ? "edit-post-container-big" : "edit-post-container"}>
      <h3 className="edit-post">Create Post</h3>
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
          placeholder="What's on your mind?"
          className={body.length < 35 ? "edit-body-short" : "edit-body"}
          value={body}
          onChange={(e) => setBody(e.target.value)}
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

  {
    /* <input
              placeholder="What's on your mind?"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></input> */
  }
}

export default PostForm;

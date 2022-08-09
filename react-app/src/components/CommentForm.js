import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../store/comments";

function CommentForm({ post }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [view, setView] = useState("");
  const [errors, setErrors] = useState([]);

  const onSelectFile = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setView(file);
    setImage(e.target.files[0]);
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

      const newComment = {
        user_id: sessionUser.id,
        post_id: post.id,
        body,
        image_url: data.image,
      };

      await dispatch(addComment(newComment)).then(() => {
        setBody("");
        setImage("");
        setView("");
      });
    }
  };

  return (
    <div>
      {sessionUser && (
        <>
          <div className="write-comment-container">
            <img
              className="profile-picture-comments"
              src={sessionUser.profile_pic}
            />
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="comment-input-container">
                <input
                  className="comment-form"
                  placeholder="Write a comment..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <label for="comment-upload-photo">
                  <i className="fa-solid fa-camera"></i>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                  id="comment-upload-photo"
                  style={{ display: "none" }}
                />
              </div>
              <div>
                {view && (
                  <>
                    <img src={view} height="250" width="250" />
                    <button
                      type="button"
                      onClick={(e) => {
                        setView("");
                        setImage("");
                      }}
                    >
                      Delete
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
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default CommentForm;

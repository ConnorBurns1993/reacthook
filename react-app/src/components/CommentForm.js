import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addComment } from "../store/comments";

function CommentForm({ post }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [view, setView] = useState("");
  const [hover, setHover] = useState(false);
  const [errors, setErrors] = useState([]);

  const fileRef = useRef();

  const handleHover = () => {
    setHover((current) => !current);
  };

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setView(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (body.length <= 150 && body) {
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
    }
  };

  return (
    <div>
      {sessionUser && (
        <>
          <div className="write-comment-container">
            <NavLink to={`/${sessionUser.id}`}>
              <img
                className="profile-picture-comments"
                src={sessionUser.profile_pic}
              />
            </NavLink>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="comment-input-container">
                <input
                  onMouseEnter={(e) => setHover(true)}
                  onMouseLeave={(e) => setHover(false)}
                  className="comment-form"
                  placeholder="Write a comment..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <button
                  type="button"
                  className="comment-upload-button"
                  onClick={(e) => fileRef.current.click(e)}
                >
                  <i className="fa-solid fa-camera"></i>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                  onChange={onSelectFile}
                  id="comment-upload-photo"
                  hidden
                />
              </div>
              {!body && hover && (
                <span className="comment-span">
                  Comments must have atleast 1 character.
                </span>
              )}
              <p
                className={
                  body.length <= 150
                    ? "comment-length-validator"
                    : "comment-length-validator-error"
                }
              >
                {body.length}/150
              </p>
              {body.length > 150 && (
                <p className="comment-error-description">
                  Comments can't be longer than 150 characters.
                </p>
              )}
              <div>
                {view && (
                  <>
                    <img className="comment-image-preview" src={view} />
                    <button
                      className="comment-upload-x"
                      type="button"
                      onClick={(e) => {
                        setView("");
                        setImage("");
                      }}
                    >
                      <i className="fa-solid fa-x comment-x"></i>
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

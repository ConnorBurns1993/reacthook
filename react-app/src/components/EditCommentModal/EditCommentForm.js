import { updateComment } from "../../store/comments";
import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, useEffect, useRef } from "react";

const EditCommentForm = ({
  comment,
  post,
  setEditForm,
  setShowModal,
  handleCommentOptions,
}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const fileRef = useRef();

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setView(URL.createObjectURL(file));
    }
  };

  const [body, setBody] = useState(comment?.body);
  const [imageUrl, setImageUrl] = useState(comment?.image_url);
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState("");
  const [view, setView] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover((current) => !current);
  };

  const updateBody = (e) => setBody(e.target.value);

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

        if (data.image) {
          const editComment = {
            ...comment,
            user_id: sessionUser.id,
            post_id: post.id,
            body,
            image_url: data.image,
          };
          await dispatch(updateComment(editComment));
        } else {
          const editComment = {
            ...comment,
            user_id: sessionUser.id,
            post_id: post.id,
            body,
            image_url: imageUrl,
          };

          await dispatch(updateComment(editComment))
            .then(() => setShowModal(false))
            .then((e) => setEditForm(false))
            .then(() => handleCommentOptions());
        }
      }
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowModal(false);
    setEditForm(false);
  };

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setShowModal(false);
      setEditForm(false);
      handleCommentOptions();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <>
      <form className="edit-comment-form" onSubmit={(e) => handleSubmit(e)}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="comment-input-container">
          <input
            onMouseEnter={(e) => setHover(true)}
            onMouseLeave={(e) => setHover(false)}
            className="comment-form"
            value={body}
            onChange={updateBody}
          ></input>
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
          <p className="comment-error-description-edit">
            Comments can't be longer than 150 characters.
          </p>
        )}
        {!body && hover && (
          <p className="comment-span-edit">
            Comments can't be less than 1 character.
          </p>
        )}
        <p className="comment-cancel">
          Press Esc to{" "}
          <p onClick={handleCancelClick} className="comment-cancel-inner">
            cancel
          </p>
          .
        </p>
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
        <button
          className="hidden"
          onClick={handleSubmit}
          type="submit"
        ></button>
        <button className="hidden" onClick={handleCancelClick}></button>
      </form>
    </>
  );
};

export default EditCommentForm;

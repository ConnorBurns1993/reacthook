import { updateComment } from "../store/comments";
import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, useEffect } from "react";

const EditCommentForm = ({ comment, post, setEditForm }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [body, setBody] = useState(comment?.body);
  const [imageUrl, setImageUrl] = useState(comment?.image_url);
  const [errors, setErrors] = useState([]);

  const updateBody = (e) => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editComment = {
      ...comment,
      user_id: sessionUser.id,
      post_id: post.id,
      body,
      imageUrl,
    };

    dispatch(updateComment(editComment))
      .then((e) => setEditForm(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setEditForm(false);
  };

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setEditForm(false);
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

        <input value={body} onChange={updateBody}></input>
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

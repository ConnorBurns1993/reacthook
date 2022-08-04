import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store/posts";
import { useHistory } from "react-router-dom";

function PostForm({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: sessionUser.id,
      body,
      imageUrl,
    };

    dispatch(addPost(newPost))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div>
      {sessionUser && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <button onClick={(e) => handleCancel(e)}>X</button>
          <input
            placeholder="What's on your mind?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></input>
          <button type="button">Adding Image AWS will go here</button>
          <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
      )}
    </div>
  );
}

export default PostForm;

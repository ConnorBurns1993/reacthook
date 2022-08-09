import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../store/posts";

function EditPostForm({ setShowModal, post, handleOptions }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState(post?.body);
  const [imageUrl, setImageUrl] = useState(post?.image_url);
  const [errors, setErrors] = useState([]);

  const updateBody = (e) => setBody(e.target.value);

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      ...post,
      user_id: post.user_id,
      body,
      imageUrl,
    };

    dispatch(updatePost(updatedPost))
      .then(() => setShowModal(false))
      .then(() => handleOptions())
      .catch(async (res) => {
        // const data = await res.json();
        // if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <button onClick={(e) => handleCancel(e)}>X</button>
        <input value={body} onChange={updateBody}></input>
        <button type="button">Adding Image AWS will go here</button>
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  );
}
export default EditPostForm;

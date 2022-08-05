import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store/posts";
import { useHistory } from "react-router-dom";

function PostForm({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("image", image);

    const res = await fetch("/api/posts/post-image", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      const data = await res.json();

      const newPost = {
        user_id: sessionUser.id,
        body,
        image_url: data.image,
      };

      const response = await dispatch(addPost(newPost));

      if (response === "Success") {
        setShowModal(false);
      }
      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) setErrors(data.errors);
    }
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

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
      )}
    </div>
  );
}

export default PostForm;

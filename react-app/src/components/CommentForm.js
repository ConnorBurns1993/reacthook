import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../store/comments";

function CommentForm({ post }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);

  const onSelectFile = (e) => {
    e.preventDefault();
    const file = URL.createObjectURL(e.target.files[0]);
    setImage(file);
    console.log(image);
  };

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

      const newComment = {
        user_id: sessionUser.id,
        post_id: post.id,
        body,
        image_url: data.image,
      };

      await dispatch(addComment(newComment)).then(() => {
        setBody("");
        setImage("");
      });
    }
  };

  return (
    <div>
      {sessionUser && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="Write a comment..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></input>
          <input type="file" accept="image/*" onChange={onSelectFile} />
          <div>
            {image && (
              <div>
                <img src={image} height="250" width="250" alt="upload" />
                <button onClick={(e) => setImage(e !== image)}>Delete</button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default CommentForm;

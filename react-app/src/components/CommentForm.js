import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../store/comments";
import { useHistory } from "react-router-dom";

function CommentForm({ post }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      userId: sessionUser.id,
      post_id: post.id,
      body,
      imageUrl,
    };

    dispatch(addComment(newComment)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
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
          <button type="button">Adding Image AWS will go here</button>
          <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
      )}
    </div>
  );
}

export default CommentForm;

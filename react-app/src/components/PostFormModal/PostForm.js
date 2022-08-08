import React, { useState } from "react";
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
      setShowModal(false);

      const newPost = {
        user_id: sessionUser.id,
        body,
        image_url: data.image,
      };

      await dispatch(addPost(newPost)).then(() => {
        setView("");
      });
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

          <input type="file" accept="image/*" onChange={onSelectFile} />
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
              </>
            )}
          </div>
          <button onClick={(e) => handleSubmit(e)}>Submit</button>
          {imageLoading && (
            <div>
              <img
                className="image-loading"
                src="https://flevix.com/wp-content/uploads/2019/07/Untitled-2.gif"
              ></img>
              <p>Posting</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default PostForm;

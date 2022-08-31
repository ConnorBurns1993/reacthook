import React, { useState, useRef } from "react";
import EditPostFormModal from "./EditPostFormModal/EditPostFormModal";
import DeletePostModal from "./DeletePostModal/DeletePostModal";
import Comments from "./Comments";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addComment } from "../store/comments";
import { useSelector } from "react-redux";
import { addPostLike } from "../store/postLike";
import { getAllPosts } from "../store/posts";
import moment from "moment";

const SinglePost = ({ post }) => {
  const [options, setOptions] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [view, setView] = useState("");
  const [hover, setHover] = useState(false);
  const [errors, setErrors] = useState([]);

  const postDate = new Date(post.updated_on);

  console.log(postDate);

  console.log(moment(postDate).fromNow());

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

  const handleLike = async (e) => {
    e.preventDefault();
    await dispatch(addPostLike(post.id));
    await dispatch(getAllPosts());
  };

  const handleOptions = (e) => {
    setOptions((current) => !current);
  };

  const ref = useRef();

  return (
    <li className="post-container">
      <NavLink className="post-navlink" to={`/${post.user_id}`}>
        <img
          src={post.user?.profile_pic}
          className="profile-picture-nav post-profile single-post"
        />
      </NavLink>
      <NavLink to={`/${post.user_id}`}>
        <p className="posts-names">
          {post.user?.first_name} {post.user?.last_name}
        </p>
      </NavLink>
      <p className="post-time">{moment(post.created_on).fromNow()}</p>
      {sessionUser.id === post.user_id && (
        <i
          className="fa-solid fa-ellipsis posts-ellipsis"
          onClick={handleOptions}
        ></i>
      )}
      {sessionUser.id === post.user_id && options && (
        <>
          <div className="edit-delete-post-container">
            <EditPostFormModal
              post={post}
              sessionUser={sessionUser}
              handleOptions={handleOptions}
            />
            <p className="p2">__________________________________</p>
            <DeletePostModal
              post={post}
              sessionUser={sessionUser}
              handleOptions={handleOptions}
            />
          </div>
          <div className="overlay" onClick={() => setOptions(false)}></div>
        </>
      )}
      <p className={post.body.length < 35 ? "post-body-short" : "post-body"}>
        {post.body}
      </p>
      {post.image_url && (
        <img className="post-image" src={post.image_url}></img>
      )}
      <div className="likes-and-comments-amount">
        {post.post_likes.length > 0 && (
          <div className="thumb-num">
            <img
              className="thumbs-up"
              src="https://i.pinimg.com/originals/39/44/6c/39446caa52f53369b92bc97253d2b2f1.png"
            />{" "}
            <p className="post-likes">{post.post_likes.length}</p>
          </div>
        )}

        {post.comments.length > 0 && post.comments.length === 1 && (
          <p
            className={
              post.post_likes.length > 0
                ? "comment-amount"
                : "comment-amount-single"
            }
          >
            {" "}
            {post.comments.length} Comment
          </p>
        )}
        {post.comments.length > 1 && (
          <p
            className={
              post.post_likes.length > 0
                ? "comment-amount"
                : "comment-amount-single"
            }
          >
            {" "}
            {post.comments.length} Comments
          </p>
        )}
      </div>
      <div className="likes-and-comments">
        <p
          className={
            post.post_likes?.filter((post_like) => {
              return post_like.user_id === sessionUser.id;
            }).length === 1
              ? "like-full"
              : "like"
          }
          onClick={handleLike}
        >
          <i
            className={
              post.post_likes?.filter((post_like) => {
                return post_like.user_id === sessionUser.id;
              }).length === 1
                ? "fa-solid fa-thumbs-up"
                : "fa-regular fa-thumbs-up"
            }
          ></i>
          Like
        </p>
        <p className="comment" onClick={() => ref.current.focus()}>
          <i className="fa-regular fa-message"></i>Comment
        </p>
      </div>

      <Comments post={post} />
      {/* <CommentForm post={post} ref={ref} /> */}
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
                    ref={ref}
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
    </li>
  );
};

export default SinglePost;

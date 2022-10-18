import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./User.css";
import SplashPage from "./SplashPage";
import PostFormModalUser from "./PostFormModal/PostFormModalUser";
import SinglePostUser from "./SinglePostUser";
import { getAllUsers, updateUser } from "../store/session";
import NotFound from "./NotFound";

function User() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [user, setUser] = useState({});
  const [view, setView] = useState("");
  const [coverView, setCoverView] = useState("");
  const [image, setImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [profilePic, setProfilePic] = useState(sessionUser?.profile_pic);
  const [coverPic, setCoverPic] = useState(sessionUser?.cover_pic);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [imageLoading, setImageLoading] = useState(false);
  const [profileOptions, setProfileOptions] = useState(false);

  const fileRef = useRef();
  const coverRef = useRef();

  const onSelectFile = (e) => {
    setProfileOptions(true);
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setView(URL.createObjectURL(file));
    }
  };

  const onSelectCover = (e) => {
    setProfileOptions(true);
    const coverFile = e.target.files[0];
    setCoverImage(coverFile);
    if (coverFile) {
      setCoverView(URL.createObjectURL(coverFile));
    }
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

      if (data.image) {
        const updatedProfilePic = {
          ...sessionUser,
          profile_pic: data.image,
        };

        await dispatch(updateUser(updatedProfilePic)).then(() => {
          setImage("");
          setView("");
        });
      } else {
        const updatedProfilePic = {
          ...sessionUser,
          profile_pic: profilePic,
        };
        await dispatch(updateUser(updatedProfilePic)).then(() => {
          setImage("");
          setView("");
        });
      }
    }
  };

  const handleCoverSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("image", coverImage);

    setImageLoading(true);

    const res = await fetch("/api/posts/post-image", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      const data = await res.json();

      setImageLoading(false);

      if (data.image) {
        const updatedCoverPic = {
          ...sessionUser,
          cover_pic: data.image,
        };

        await dispatch(updateUser(updatedCoverPic)).then(() => {
          setCoverImage("");
          setCoverView("");
        });
      } else {
        const updatedCoverPic = {
          ...sessionUser,
          cover_pic: coverPic,
        };
        await dispatch(updateUser(updatedCoverPic)).then(() => {
          setCoverImage("");
          setCoverView("");
        });
      }
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    } catch (err) {
      history.replace("/not-found");
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  let date = user?.birthday?.substr(5, 11).split(" ").join("/");

  const day = date?.slice(0, 2);

  const month = date?.slice(3, 6);

  const year = date?.slice(7, 11);

  const birthday = `${month} ${day}, ${year}`;

  return sessionUser && posts && user ? (
    <>
      <div className="profile-container">
        <div>
          {!coverView && sessionUser.id === user.id ? (
            <button
              className="edit-cover-photo"
              onClick={(e) => coverRef.current.click(e)}
              type="button"
            >
              <i className="fa-solid fa-camera"></i> Edit cover photo
            </button>
          ) : (
            <button
              className={sessionUser.id === user.id ? "cover-submit" : "hidden"}
              onClick={handleCoverSubmit}
            >
              <i className="fa-solid fa-check"></i>
            </button>
          )}
          {sessionUser.id.toString() === userId ? (
            <img className="cover-pic" src={sessionUser?.cover_pic} />
          ) : (
            <>
              <img className="cover-pic" src={user?.cover_pic} />
              <button className="add-friend">
                <i className="fa-solid fa-user-plus"></i>Add Friend
              </button>
            </>
          )}
        </div>
        <div className="picture-and-name-profile">
          {sessionUser.id.toString() === userId ? (
            <img
              className="profile-page-image"
              src={sessionUser?.profile_pic}
            />
          ) : (
            <img className="profile-page-image" src={user?.profile_pic} />
          )}
          <p className="profile-page-name">
            {user?.first_name} {user?.last_name}
          </p>
          {!view && sessionUser.id === user.id ? (
            <button
              type="button"
              className="comment-upload-button"
              id="edit-upload-profile"
              onClick={(e) => fileRef.current.click(e)}
            >
              <i className="fa-solid fa-camera profile-camera"></i>
            </button>
          ) : (
            <button
              className={
                sessionUser.id === user.id ? "profile-submit" : "hidden"
              }
              onClick={handleSubmit}
            >
              <i className="fa-solid fa-check"></i>
            </button>
          )}
          {view && (
            <>
              <img className="profile-image-preview" src={view} />
              <button
                className="profile-upload-x"
                type="button"
                onClick={(e) => {
                  setView("");
                  setImage("");
                }}
              >
                <i className="fa-solid fa-x comment-x"></i>
              </button>
            </>
          )}
        </div>
        {sessionUser.id.toString() === userId && (
          <>
            <form>
              {coverView && (
                <>
                  <img className="cover-pic-view" src={coverView} />
                  <button
                    className="cover-upload-x"
                    type="button"
                    onClick={(e) => {
                      setCoverView("");
                      setCoverImage("");
                    }}
                  >
                    <i className="fa-solid fa-x comment-x"></i>
                  </button>
                </>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                onChange={onSelectFile}
                id="comment-upload-photo"
                hidden
              />

              <input
                ref={coverRef}
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                onChange={onSelectCover}
                id="comment-upload-photo"
                hidden
              />
            </form>
          </>
        )}
      </div>
      <div className="post-form-container-profile">
        <PostFormModalUser
          sessionUser={sessionUser}
          user={user}
          userId={userId}
        />
      </div>
      <div className="all-posts-container-profile">
        <div className="intro-div">
          <h2 className="intro">Intro</h2>
          <p className="intro-text">
            <i className="fa-solid fa-signature"></i>My name is{" "}
            <b>
              {user?.first_name} {user?.last_name}
            </b>
          </p>
          <p className="intro-text">
            <i className="fa-solid fa-cake-candles"></i> My birthday is{" "}
            <b>{birthday}</b>
          </p>
          <p className="intro-text">
            <i
              className={
                user?.gender === "Male"
                  ? "fa-solid fa-mars"
                  : user?.gender === "Female"
                  ? "fa-solid fa-venus"
                  : "fa-solid fa-mars-stroke-up"
              }
            ></i>
            {""} I identify as <b>{user?.gender}</b>
          </p>
        </div>
        {Object.values(posts)
          .sort()
          .reverse()
          .map((post) => (
            <SinglePostUser
              user={user}
              post={post}
              key={post.id}
              sessionUser={sessionUser}
              posts={posts}
            />
          ))}
      </div>
    </>
  ) : (
    <NotFound />
  );
}

export default withRouter(User);

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
  const [image, setImage] = useState("");
  const [profilePic, setProfilePic] = useState(sessionUser?.profile_pic);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [imageLoading, setImageLoading] = useState(false);

  // const fileRef = useRef();

  // const handleSubmit = async (e) => {
  //   // e.preventDefault();

  //   const form = new FormData();
  //   form.append("image", image);

  //   const file = e.target.files[0];
  //   setImage(file);
  //   setImageLoading(true);

  //   const res = await fetch("/api/posts/post-image", {
  //     method: "POST",
  //     body: form,
  //   });

  //   if (res.ok) {
  //     const data = await res.json();
  //     console.log(data);
  //     setImageLoading(false);

  //     if (data.image) {
  //       const updatedProfilePic = {
  //         ...sessionUser,
  //         profile_pic: data.image,
  //       };

  //       console.log(updatedProfilePic);

  //       await dispatch(updateUser(updatedProfilePic));
  //     } else {
  //       const updatedProfilePic = {
  //         ...sessionUser,
  //         profile_pic: profilePic,
  //       };
  //       await dispatch(updateUser(updatedProfilePic));
  //     }
  //   }
  // };

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
        <img className="cover-pic" src={user?.cover_pic} />
        <img className="profile-page-image" src={user?.profile_pic} />
        <p className="profile-page-name">
          {user?.first_name} {user?.last_name}
        </p>
        {/* {sessionUser.id.toString() === userId && (
          <>
            <form>
              <button
                type="button"
                className="comment-upload-button"
                id="edit-upload-profile"
                onClick={(e) => fileRef.current.click(e)}
              >
                <i className="fa-solid fa-camera profile-camera"></i>
              </button>
              <button className="edit-cover-photo">
                <i className="fa-solid fa-camera"></i> Edit cover photo
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                onChange={handleSubmit}
                id="comment-upload-photo"
                hidden
              />
            </form>
          </>
        )} */}
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

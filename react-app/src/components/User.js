import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostFormModal from "./PostFormModal/PostFormModal";
import "./User.css";
import SinglePost from "./SinglePost";
import SplashPage from "./SplashPage";

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return sessionUser && posts ? (
    <>
      <div className="profile-container">
        <img className="cover-pic" src={user?.cover_pic} />
        <img className="profile-page-image" src={user?.profile_pic} />
        <p className="profile-page-name">
          {user?.first_name} {user?.last_name}
        </p>
      </div>
      <div className="post-form-container">
        <PostFormModal sessionUser={sessionUser} />
      </div>
      <div className="all-posts-container">
        {Object.values(posts)
          .sort()
          .reverse()
          .map((post) => (
            <SinglePost
              post={post}
              key={post.id}
              sessionUser={sessionUser}
              posts={posts}
            />
          ))}
      </div>
    </>
  ) : (
    <SplashPage />
  );
}

export default User;

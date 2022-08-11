import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostFormModal from "./PostFormModal/PostFormModal";
import "./Posts.css";
import SinglePost from "./SinglePost";
import SplashPage from "./SplashPage";

const Posts = ({ loaded }) => {
  const posts = useSelector((state) => state.posts);
  const sessionUser = useSelector((state) => state.session.user);

  const [options, setOptions] = useState(false);

  const handleOptions = (e) => {
    setOptions((current) => !current);
  };

  return sessionUser ? (
    <>
      <div className="post-form-container">
        <div className="name-fixed">
          <img
            className="profile-picture-nav profile-home"
            src={sessionUser?.profile_pic}
          />
          <p className="profile-home-name">
            {sessionUser.first_name} {sessionUser.last_name}
          </p>
        </div>
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
              options={options}
              sessionUser={sessionUser}
              handleOptions={handleOptions}
              posts={posts}
            />
          ))}
      </div>
    </>
  ) : (
    <SplashPage />
  );
};

export default Posts;

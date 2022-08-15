import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostFormModal from "./PostFormModal/PostFormModal";
import "./Posts.css";
import SinglePost from "./SinglePost";
import SplashPage from "./SplashPage";
import { NavLink } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const sessionUser = useSelector((state) => state.session.user);

  return sessionUser && posts ? (
    <>
      <div className="post-form-outer-container">
        <div className="post-form-container">
          <NavLink to={`/${sessionUser.id}`} exact={true}>
            <div className="name-fixed">
              <img
                className="profile-picture-nav profile-home"
                src={sessionUser?.profile_pic}
              />
              <p className="profile-home-name">
                {sessionUser.first_name} {sessionUser.last_name}
              </p>
            </div>
          </NavLink>
          <PostFormModal sessionUser={sessionUser} />
        </div>
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
};

export default Posts;

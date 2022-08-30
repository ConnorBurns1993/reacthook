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
        <div className="technologies">
          <p className="p6">_________________________</p>
          <p className="sponsored used">Technologies Used</p>
          <div className="technologies-used">
            <p>
              <i className="fa-brands fa-react tech"></i>React
            </p>
            <p>
              <i className="fa-brands fa-js tech"></i>Javascript
            </p>
            <p>
              <i className="fa-brands fa-python tech"></i>Python
            </p>
            <p>
              <i className="fa-brands fa-aws tech"></i>Amazon Web Services
            </p>
            <p className="postgresql-text">
              <img
                className="postgresql tech"
                src="https://i.imgur.com/w9j6gvE.png"
              />
              <p className="postgres-center">PostgreSQL</p>
            </p>
          </div>
        </div>
        <div className="ads">
          <p className="sponsored">Sponsored</p>
          <a
            href="https://www.appacademy.io/"
            target="_blank"
            className="ads-info"
          >
            <img
              className="app-academy"
              src="https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.png"
            />
            <div className="info-ad-div">
              <p className="ads-text">Become a Software Developer</p>
              <p className="ads-subtext">appacademy.io</p>
            </div>
          </a>
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

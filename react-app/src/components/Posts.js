import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../store/posts";
import { useEffect } from "react";
import PostFormModal from "./PostFormModal/PostFormModal";
import EditPostFormModal from "./EditPostFormModal/EditPostFormModal";
import "./Posts.css";
import DeletePostModal from "./DeletePostModal/DeletePostModal";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div className="post-form-container">
        <PostFormModal sessionUser={sessionUser} />
      </div>
      {posts && (
        <div className="all-posts-container">
          {Object.values(posts)
            .sort()
            .reverse()
            .map((post) => (
              <li className="post-container" key={post.id}>
                <img
                  src={post.user?.profile_pic}
                  className="profile-picture-nav post-profile"
                />
                <p className="posts-names">
                  {post.user?.first_name} {post.user?.last_name}
                </p>
                <p className="post-body">{post.body}</p>
                <img className="post-image" src={post.image_url}></img>
                {sessionUser.id === post.user_id && (
                  <div>
                    <EditPostFormModal post={post} />
                    <DeletePostModal post={post} />
                  </div>
                )}

                <CommentForm post={post} />
                <Comments post={post} />
              </li>
            ))}
        </div>
      )}
    </>
  );
};

export default Posts;

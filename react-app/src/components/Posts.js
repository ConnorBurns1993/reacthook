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
      <PostFormModal />
      {posts && (
        <div>
          {Object.values(posts)
            .sort()
            .reverse()
            .map((post) => (
              <li className="post-container" key={post.id}>
                <div className="post-content">
                  <p>{post.body}</p>
                  <img src={post.image_url}></img>
                  {sessionUser.id === post.user_id && (
                    <div>
                      <EditPostFormModal post={post} />
                      <DeletePostModal post={post} />
                    </div>
                  )}
                </div>
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

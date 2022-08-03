import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../store/posts";
import { useEffect } from "react";
import "./Posts.css";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <>
      {posts && (
        <div>
          {Object.values(posts).map((post) => (
            <li className="post-container" key={post.id}>
              <p>{post.body}</p>
              <img src={post.image_url}></img>
            </li>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;

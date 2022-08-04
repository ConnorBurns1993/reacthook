import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../store/posts";
import { useEffect } from "react";
import PostFormModal from "./PostFormModal/PostFormModal";
import EditPostFormModal from "./EditPostFormModal/EditPostFormModal";
import "./Posts.css";
import DeletePostModal from "./DeletePostModal/DeletePostModal";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

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
                <p>{post.body}</p>
                <img src={post.image_url}></img>
                {sessionUser && (
                  <div>
                    <EditPostFormModal post={post} />
                    <DeletePostModal post={post} />
                  </div>
                )}
              </li>
            ))}
        </div>
      )}
    </>
  );
};

export default Posts;

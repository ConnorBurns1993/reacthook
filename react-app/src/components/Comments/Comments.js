import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostComments } from "../../store/comments";
import { useEffect } from "react";
import SingleComment from "./SingleComment";

const Comments = ({ post }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getPostComments(post.id));
  }, [dispatch, post.id]);

  return (
    <>
      {post.id && (
        <div>
          {Object.values(comments).map((comment) => (
            <SingleComment
              key={comment.id}
              comment={comment}
              sessionUser={sessionUser}
              post={post}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;

const SingleComment = ({ comment, post }) => {
  return (
    <>
      {comment.post_id === post.id && (
        <li key={comment.id}>
          <p>{comment.body}</p>
          <img src={comment.image_url}></img>
        </li>
      )}
    </>
  );
};

export default SingleComment;

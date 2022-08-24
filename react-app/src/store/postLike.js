const CREATE_POSTLIKE = "posts/CREATE_POSTLIKE";

const createPostLike = (postId) => ({
  type: CREATE_POSTLIKE,
  payload: postId,
});

export const addPostLike = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postId),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createPostLike(data));
    return "Success";
  } else {
    const data = response.json();
    if (data.errors) {
      return data.errors;
    }
  }
};

const initialState = {};

export default function postLikeReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POSTLIKE: {
      return { post_likes: action.payload };
    }

    default:
      return state;
  }
}

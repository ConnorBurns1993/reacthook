const GET_POSTS = "posts/GET_POSTS";

const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    payload: posts,
  };
};

export const getAllPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/");
  if (response.ok) {
    const data = await response.json();
    dispatch(getPosts(data.posts));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occured. Please try again."];
  }
};

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS: {
      const newState = {};
      action.payload.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    }

    default:
      return state;
  }
}

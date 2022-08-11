const GET_POSTS = "posts/GET_POSTS";
const CREATE_POST = "posts/CREATE_POST";
const EDIT_POST = "posts/EDIT_POST";
const DELETE_POST = "posts/DELETE_POST";

const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    payload: posts,
  };
};

const createPost = (post) => ({
  type: CREATE_POST,
  payload: post,
});

const editPost = (post) => ({
  type: EDIT_POST,
  payload: post,
});

const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId,
});

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

export const addPost = (post) => async (dispatch) => {
  const response = await fetch("/api/posts/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createPost(data));
    return "Success";
  } else {
    const data = response.json();
    if (data.errors) {
      return data.errors;
    }
  }
};

export const updatePost = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(editPost(data));

    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const destroyPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deletePost(postId));
    return postId;
  } else {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
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
    case CREATE_POST: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case EDIT_POST: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_POST:
      const newState = { ...state };
      delete newState[action.payload];

      return newState;

    default:
      return state;
  }
}

const GET_COMMENTS = "posts/GET_COMMENTS";
const CREATE_COMMENT = "posts/CREATE_COMMENT";
const EDIT_COMMENT = "posts/EDIT_COMMENT";
const DELETE_COMMENT = "posts/DELETE_COMMENT";

const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    payload: comments,
  };
};

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment,
});

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  payload: comment,
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

export const addComment = (comment) => async (dispatch) => {
  const response = await fetch("/api/comments/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createComment(data));
    return "Success";
  } else {
    const data = response.json();
    if (data.errors) {
      return data.errors;
    }
  }
};

export const updateComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(editComment(data));

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

export const destroyComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteComment(commentId));
    return commentId;
  } else {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
};

export const getPostComments = (post_id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${post_id}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getComments(data.comments));
    return data.comments;
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
    case GET_COMMENTS: {
      const newState = {};
      action.payload.forEach((comment) => {
        newState[comment.id] = comment;
      });
      return newState;
    }
    case CREATE_COMMENT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case EDIT_COMMENT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_COMMENT:
      const newState = { ...state };
      delete newState[action.payload];

      return newState;

    default:
      return state;
  }
}

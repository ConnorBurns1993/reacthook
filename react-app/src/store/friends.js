const CREATE_REQUEST = "friends/CREATE_REQUEST";
const DELETE_REQUEST = "friends/DELETE_REQUEST";
const GET_FRIENDS = "friends/GET_FRIENDS";

const getFriends = (friends) => {
  return {
    type: GET_FRIENDS,
    payload: friends,
  };
};

const createRequest = (request) => ({
  type: CREATE_REQUEST,
  payload: request,
});

const deleteRequest = (request) => ({
  type: DELETE_REQUEST,
  payload: request,
});

export const getAllFriends = () => async (dispatch) => {
  const response = await fetch("/api/friends/");
  if (response.ok) {
    const data = await response.json();
    dispatch(getFriends(data.friends));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occured. Please try again."];
  }
};

export const addRequest = (request) => async (dispatch) => {
  const response = await fetch("/api/friends/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createRequest(data));
    return "Success";
  } else {
    const data = response.json();
    if (data.errors) {
      return data.errors;
    }
  }
};

export const destroyRequest = (request) => async (dispatch) => {
  const response = await fetch(`/api/friends/${request}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteRequest(request));
    return request;
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
    case CREATE_REQUEST: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case GET_FRIENDS: {
      const newState = {};
      action.payload.forEach((friend) => {
        newState[friend.id] = friend;
      });
      return newState;
    }
    case DELETE_REQUEST:
      const newState = { ...state };
      delete newState[action.payload];

      return newState;

    default:
      return state;
  }
}

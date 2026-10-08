const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.payload, error: null };
    case "LOGIN_FAILURE":
      return { ...state, error: action.payload };
    case "LOGOUT":
      return { user: null, error: null };
    default:
      return state;
  }
};

export default authReducer;
const initialState = {
  loggedIn: false,
};

const userReducer = (state = initialState, action) => {
  if (action.type === "LOGIN") {
    return { ...state, loggedIn: true, ...action.data };
  } else if (action.type === "LOGOUT") {
    return { loggedIn: false };
  }
  return state;
};

export { userReducer };

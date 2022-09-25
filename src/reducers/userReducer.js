

const initialState = {
  user: null,
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        token: action.payload,
      };
    case "getUser":
      return {
        ...state,
        user: action.payload,
      };

    case "logout":
      return {
        user: null,
        token: null,
      };
    default:
      return {
        ...state,
        token: localStorage.getItem("token")
          ? localStorage.getItem("token")
          : null,
      };
  }
};

export default userReducer;

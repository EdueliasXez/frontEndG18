const initialState = {
    user: null,
    error: null,
  };
  
  function authReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        return {
          ...state,
          user: action.user,
          error: null,
        };
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
        return {
          ...state,
          user: null,
          error: action.error,
        };
      default:
        return state;
    }
  }
  
  export default authReducer;
  
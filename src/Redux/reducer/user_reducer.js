import * as actionTypes from "../types/types"; 

const initialState = {
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case actionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

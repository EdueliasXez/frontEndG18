// authReducer.js

import * as types from '../types/types';

const initialAccessToken = localStorage.getItem('accessToken');
const initialRefreshToken = localStorage.getItem('refreshToken');

const initialState = {
  isAuthenticated: !!initialAccessToken, 
  accessToken: initialAccessToken || null,
  refreshToken: initialRefreshToken || null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        error: null,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        error: action.payload,
      };
    case types.LOGOUT:
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        error: null,
      };
    default:
      return state;
  }
};

export default loginReducer;

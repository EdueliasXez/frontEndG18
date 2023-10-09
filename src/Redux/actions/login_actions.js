

import axios from 'axios';
import * as types from '../types/types';


export const loginRequest = () => ({
  type: types.LOGIN_REQUEST,
});

export const loginSuccess = (accessToken, refreshToken) => ({
  type: types.LOGIN_SUCCESS,
  payload: { accessToken, refreshToken },
});

export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const response = await axios.post('/user/login', userData);

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    dispatch(loginSuccess(accessToken, refreshToken));

  } catch (error) {
    dispatch(loginFailure(error.response.data.error));
  }
};

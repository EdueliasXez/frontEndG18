
import axios from "axios";
import * as actionTypes from "../types/types"; 

export const updateUserRequest = () => ({
  type: actionTypes.UPDATE_USER_REQUEST,
});

export const updateUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});

export const updateUserFailure = (error) => ({
  type: actionTypes.UPDATE_USER_FAILURE,
  payload: error,
});

export const updateUser = (userId, userData) => {
  return (dispatch) => {
    dispatch(updateUserRequest());

    axios
      .put(`/user/edit/${userId}`, userData) 
      .then((response) => {
        dispatch(updateUserSuccess());
      })
      .catch((error) => {
        dispatch(updateUserFailure(error));
      });
  };
};

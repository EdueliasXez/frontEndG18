import axios from 'axios';
import * as actionTypes from '../types/types';

export const getCategoriesRequest = () => ({
  type: actionTypes.GET_CATEGORIES_REQUEST,
});

export const getCategoriesSuccess = (categories) => {
  console.log("Action getCategoriesSuccess is being called"); // Agrega este console.log
  return {
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    payload: categories,
  };
};

export const getCategoriesFailure = (error) => {
  console.log("Action getCategoriesFailure is being called"); // Agrega este console.log
  return {
    type: actionTypes.GET_CATEGORIES_FAILURE,
    payload: error,
  };
};

export const getCategories = () => {
  return (dispatch) => {
    console.log("Action getCategories is being called"); 
    dispatch(getCategoriesRequest());
    axios
      .get('/categories')
      .then((response) => {
        const categories = response.data;
        dispatch(getCategoriesSuccess(categories));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getCategoriesFailure(errorMsg));
      });
  };
};


import axios from 'axios';
import * as categoryActionTypes from './categoryActionTypes';

export const getCategoriesRequest = () => ({
  type: categoryActionTypes.GET_CATEGORIES_REQUEST,
});

export const getCategoriesSuccess = (categories) => ({
  type: categoryActionTypes.GET_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getCategoriesFailure = (error) => ({
  type: categoryActionTypes.GET_CATEGORIES_FAILURE,
  payload: error,
});

export const getCategories = () => {
  return (dispatch) => {
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

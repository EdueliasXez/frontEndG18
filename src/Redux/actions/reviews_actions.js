
import axios from 'axios';
import * as actionTypes from '../types/types';

export const reviewsRequest = () => {
  return {
    type: actionTypes.REVIEWS_REQUEST
  };
};

export const reviewsSuccess = (reviews) => {
  return {
    type: actionTypes.REVIEWS_SUCCESS,
    reviews
  };
};

export const reviewsFailure = (error) => {
  return {
    type: actionTypes.REVIEWS_FAILURE,
    error
  };
};

export const getReviews = (reviewedItemId, reviewedItemType) => {
  return (dispatch) => {
    dispatch(reviewsRequest());
    axios
      .get(`/review/${reviewedItemId}?reviewedItemType=${reviewedItemType}`)
      .then((response) => {
        dispatch(reviewsSuccess(response.data));
        console.log(response.data)
      })
      .catch((error) => {
        dispatch(reviewsFailure(error.message));
      });
  };
};

export const postReviewRequest = () => {
  return {
    type: actionTypes.POST_REVIEW_REQUEST
  };
};

export const postReviewSuccess = (newReview) => {
  return {
    type: actionTypes.POST_REVIEW_SUCCESS,
    newReview
  };
};

export const postReviewFailure = (error) => {
  return {
    type: actionTypes.POST_REVIEW_FAILURE,
    error
  };
};

export const createReview = (reviewData) => {
  return (dispatch) => {
    dispatch(postReviewRequest());
    
    axios
      .post('/review/create', reviewData)
      .then((response) => {
        dispatch(postReviewSuccess(response.data));
      })
      .catch((error) => {
        dispatch(postReviewFailure(error.message));
      });
  };
};

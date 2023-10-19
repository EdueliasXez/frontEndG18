
import * as actionTypes from '../types/types';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.REVIEWS_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null };
    case actionTypes.REVIEWS_SUCCESS:
      return { 
        ...state, 
        reviews: action.reviews, 
        loading: false, 
        error: null };
    case actionTypes.REVIEWS_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.error };
    case actionTypes.POST_REVIEW_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null };
    case actionTypes.POST_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.newReview],
        loading: false,
        error: null,
      };
    case actionTypes.POST_REVIEW_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.error };
    default:
      return state;
  }
};

export default reviewReducer;

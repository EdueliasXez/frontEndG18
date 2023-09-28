import * as actionTypes from '../types/types';

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_EVENTS_FAILURE:
      return {
        ...state,
        events: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;

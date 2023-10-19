import * as actionTypes from '../types/types';

const initialState = {
    events: [],
    loading: false,
    error: null,
  };
  const eventServiceReducer = (state = initialState, action) => {
    switch (action.type) {

    case actionTypes.GET_EVENTSERVICE_REQUEST:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case actionTypes.GET_EVENTSERVICE_SUCCESS:
    return {
        ...state,
        loading: false,
        events: action.payload,
        error: null,
      };
  case actionTypes.GET_EVENTSERVICE_FAILURE:
    return {
        ...state,
        loading: false,
        events: [],
        error: action.payload,
      };
      default:
        return state;
    }
  };
  
  export default eventServiceReducer;
  
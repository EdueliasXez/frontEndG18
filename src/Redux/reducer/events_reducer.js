import * as actionTypes from '../types/types';

const initialState = {
  events: [],
  filteredEvents: [],
  eventDetail: null, 
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
        filteredEvents: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_EVENTS_FAILURE:
      return {
        ...state,
        events: [],
        filteredEvents: [],
        loading: false,
        error: action.payload,
      };
    case actionTypes.FILTER_EVENTS_BY_CATEGORY:
      return {
        ...state,
        filteredEvents: action.payload,
      };
      case actionTypes.FILTER_EVENTS:
  return {
    ...state,
    filteredEvents: action.payload,
  };
    case actionTypes.GET_EVENT_DETAIL:
      return {
        ...state,
        eventDetail: action.payload, 
      };
    case actionTypes.CLEAN_EVENT_DETAIL:
      return {
        ...state,
        eventDetail: null,
      };
      case actionTypes.CREATE_EVENT_REQUEST:
  return {
    ...state,
    loading: true,
    error: null,
  };
case actionTypes.CREATE_EVENT_SUCCESS:
  return {
    ...state,
    events: [...state.events, action.payload], 
    loading: false,
    error: null,
  };
case actionTypes.CREATE_EVENT_FAILURE:
  return {
    ...state,
    loading: false,
    error: action.payload,
  };
    default:
      return state;
  }
};

export default eventReducer;

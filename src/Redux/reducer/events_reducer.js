import * as actionTypes from '../types/types';

const initialState = {
  events: [],
  filteredEvents: [],
  eventDetail: null, // Agregamos el estado de eventDetail
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
    case actionTypes.GET_EVENT_DETAIL:
      return {
        ...state,
        eventDetail: action.payload, // Agregamos el estado de eventDetail
      };
    case actionTypes.CLEAN_EVENT_DETAIL:
      return {
        ...state,
        eventDetail: null,
      };
    default:
      return state;
  }
};

export default eventReducer;

// En tu archivo de reducers/eventsReducer.js
import * as actionTypes from '../types/types';

const initialState = {
  events: [], // Todos los eventos
  filteredEvents: [], // Eventos filtrados por categoría
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
    filteredEvents: action.payload, // Usar los eventos filtrados directamente desde el action
  };
    default:
      return state;
  }
};

export default eventReducer;

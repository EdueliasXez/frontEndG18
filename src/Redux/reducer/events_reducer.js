import * as actionTypes from '../types/types';

const initialState = {
  events: [],
  filteredEvents: [],
  eventDetail: null,
  postCreateEvent: [],
  loading: false,
  error: null,
  eventLocations: {
    countries: [],
    cities: [],
  },
  tickets: [], 
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
      const events = action.payload;
      const uniqueCities = [...new Set(events.map(event => event.placeId.city))];
      const uniqueCountries = [...new Set(events.map(event => event.placeId.country))];
      return {
        ...state,
        events,
        filteredEvents: events,
        loading: false,
        error: null,
        eventLocations: {
          countries: uniqueCountries,
          cities: uniqueCities,
        },
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
    case actionTypes.POST_CREATE_EVENT:
      if (action.payload.status === 200) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          error: action.payload.data,
        };
      }
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
    case actionTypes.FILTER_EVENTS_BY_PRICE_RANGE:
      return {
        ...state,
        filteredEvents: action.payload,
      };
      
    case actionTypes.FILTER_EVENTS_BY_LOCATION:
      return {
        ...state,
        filteredEvents: action.payload,
      };
      case actionTypes.GET_TICKETS_REQUEST:
  return {
    ...state,
    loading: true,
    error: null,
  };
case actionTypes.GET_TICKETS_SUCCESS:
  return {
    ...state,
    tickets: action.payload, 
    loading: false,
    error: null,
  };
case actionTypes.GET_TICKETS_FAILURE:
  return {
    ...state,
    tickets: [], 
    loading: false,
    error: action.payload,
  };
    default:
      return state;
  }
};

export default eventReducer;

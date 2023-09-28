import axios from 'axios';
import * as actionTypes from '../types/types';

export const getEventsRequest = () => ({
  type: actionTypes.GET_EVENTS_REQUEST, 
});

export const getEventsSuccess = (events) => ({
  type: actionTypes.GET_EVENTS_SUCCESS, 
  payload: events,
});

export const getEventsFailure = (error) => ({
  type: actionTypes.GET_EVENTS_FAILURE,
  payload: error,
});

export const getEvents = () => {
  return (dispatch) => {
    dispatch(getEventsRequest());
    axios
      .get('/events')
      .then((response) => {
        const events = response.data;
        dispatch(getEventsSuccess(events));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getEventsFailure(errorMsg));
      });
  };
};

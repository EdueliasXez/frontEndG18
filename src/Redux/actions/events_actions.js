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
export const getEventsCreate = (error) => ({
  type: actionTypes.POST_CREATE_EVENT,
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

export const filterEventsByCategory = (selectedCategories) => {
  return (dispatch, getState) => {
    const { events } = getState();

    const filteredEvents = events.events.filter((event) => {
      return (
        selectedCategories.length === 0 || // Si no se seleccionan categorías, no se aplica filtro
        selectedCategories.every((selectedCategory) =>
          event.categories.some((category) => category._id === selectedCategory.value)
        )
      );
    });

    dispatch({
      type: actionTypes.FILTER_EVENTS_BY_CATEGORY,
      payload: filteredEvents,
    });
  };
};

export const getEventDetail = (eventId) => async (dispatch) => {
  try {
    const response = await axios.get(`/events/${eventId}`);
    const event = response.data;
    dispatch({
      type: actionTypes.GET_EVENT_DETAIL, 
      payload: event,
    });
  } catch (error) {
    console.error('Error al obtener el detalle del evento:', error);
  }
};
export const postCreateEvent = (form) => async (dispatch) => {
  try {
    const response = await axios.post('/events', form);
    
    // Verificar la respuesta del servidor antes de despachar la acción
    return dispatch({
      type: actionTypes.POST_CREATE_EVENT,
      payload: {
          data: response.data,
          status: response.status
          }
      });

  } catch (error) {
    console.error('Error creating Event:', error);
  }
};

export const cleanDetail = () => ({
  type: actionTypes.CLEAN_EVENT_DETAIL, 
});
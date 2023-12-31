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

export const filterEventsByCategory = (selectedCategories) => {
  return (dispatch, getState) => {
    const { events } = getState();

    const filteredEvents = events.events.filter((event) => {
      return (
        selectedCategories.length === 0 || 
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

export const filterEvents = (searchText) => {
  return (dispatch, getState) => {
    const { events } = getState();

    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const normalizedSearchText = removeAccents(searchText.toLowerCase());

    const filteredEvents = events.events.filter((event) => {
      const eventInfo = removeAccents(Object.values(event).join(" ")).toLowerCase();
      const keywords = normalizedSearchText.split(" ");
      return keywords.some((keyword) => eventInfo.includes(` ${keyword} `));
    });

    dispatch({
      type: actionTypes.FILTER_EVENTS,
      payload: filteredEvents,
    });
  };
};

export const createEventRequest = () => ({
  type: actionTypes.CREATE_EVENT_REQUEST,
});

export const createEventSuccess = (event) => ({
  type: actionTypes.CREATE_EVENT_SUCCESS,
  payload: event,
});

export const createEventFailure = (error) => ({
  type: actionTypes.CREATE_EVENT_FAILURE,
  payload: error,
});

export const createEvent = (eventData) => {
  return (dispatch) => {
    dispatch(createEventRequest());
    axios
      .post('/events/create', eventData)
      .then((response) => {
        const createdEvent = response.data;
        dispatch(createEventSuccess(createdEvent));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(createEventFailure(errorMsg));
      });
  };
};

export const filterEventsByPriceRange = (priceRange) => {
  return (dispatch, getState) => {
    const { events } = getState();

    const filteredEvents = events.events.filter((event) => {
      return priceRange[0] <= event.price && event.price <= priceRange[1];
    });

    dispatch({
      type: actionTypes.FILTER_EVENTS_BY_PRICE_RANGE,
      payload: filteredEvents,
    });
  };
};

export const filterEventsByLocation = (selectedCountry, selectedCity) => {
  return (dispatch, getState) => {
    const { events } = getState();

    const filteredEvents = events.events.filter((event) => {
      return (
        (!selectedCountry || event.placeId.country === selectedCountry) &&
        (!selectedCity || event.placeId.city === selectedCity)
      );
    });

    dispatch({
      type: actionTypes.FILTER_EVENTS_BY_LOCATION,
      payload: filteredEvents,
    });
  };
};

export const getTicketsRequest = () => ({
  type: actionTypes.GET_TICKETS_REQUEST, 
});

export const getTicketsSuccess = (tickets) => {
  console.log('Tickets en getTicketsSuccess:', tickets); 
  return {
    type: actionTypes.GET_TICKETS_SUCCESS,
    payload: tickets,
  };
};


export const getTicketsFailure = (error) => ({
  type: actionTypes.GET_TICKETS_FAILURE, 
  payload: error,
});


export const getTicketsByUserId = (userId) => {
  return (dispatch) => {
    dispatch(getTicketsRequest());

    return axios
      .get(`/user/tickets/${userId}`)
      .then((response) => {
        const tickets = response.data;
        dispatch(getTicketsSuccess(tickets));
        return tickets;
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getTicketsFailure(errorMsg));
        throw error; 
      });
  };
};



export const updateEventRequest = () => ({
  type: actionTypes.UPDATE_EVENT_REQUEST,
});

export const updateEventSuccess = (updatedEvent) => ({
  type: actionTypes.UPDATE_EVENT_SUCCESS,
  payload: updatedEvent,
});

export const updateEventFailure = (error) => ({
  type: actionTypes.UPDATE_EVENT_FAILURE,
  payload: error,
});


export const updateEvent = (eventId, updatedEventData) => {
  return (dispatch) => {
    dispatch(updateEventRequest());
    axios
      .put(`/events/${eventId}`, { event: updatedEventData }) 
      .then((response) => {
        const updatedEvent = response.data;
        dispatch(updateEventSuccess(updatedEvent));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateEventFailure(errorMsg));
      });
  };
};
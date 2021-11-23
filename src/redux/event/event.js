import URL from '../../utils/commons';

// Action Types
const LOADING = 'LOADING';
const CREATE_EVENT = 'CREATE_EVENT';
const ALL_EVENTS = 'ALL_EVENTS';
const ATTENDING_EVENTS = 'ATTENDING_EVENTS';
const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';

// Initial State
const initialState = {
  loading: true,
  allEvents: [],
  attendingEvents: [],
  eventDetails: {},
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case CREATE_EVENT:
      return {
        ...state,
        loading: false,
        allEvents: [...state.allEvents, action.payload],
      };
    case ALL_EVENTS:
      return { ...state, loading: false, allEvents: action.payload };
    case ATTENDING_EVENTS:
      return { ...state, loading: false, attendingEvents: action.payload };
    case SET_EVENT_DETAILS:
      return { ...state, loading: false, eventDetails: action.payload };
    default:
      return state;
  }
};

// Action Creators
export const createEvent = (formData) => (dispatch) => {
  let payload = {};

  fetch(`${URL}events`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      Accept: 'application/json',
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      payload = data;
    });
  dispatch({ type: CREATE_EVENT, payload });
};

export const deleteEvent = (eventId) => async (dispatch) => {
  dispatch({ type: LOADING });
  await fetch(`${URL}events/${eventId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      Accept: 'application/json',
    },
  });
  const res = await fetch(`${URL}events`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      Accept: 'application/json',
    },
  });
  const data = await res.json();
  dispatch({ type: ALL_EVENTS, payload: data });
};

// Show All Events

export const allEvents = () => async (dispatch) => {
  dispatch({ type: LOADING });
  const res = await fetch(`${URL}events`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      Accept: 'application/json',
    },
  });
  const data = await res.json();
  dispatch({ type: ALL_EVENTS, payload: data });
};

export const attendingEvents = () => async (dispatch) => {
  dispatch({ type: LOADING });
  const res = await fetch(`${URL}attendances`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      Accept: 'application/json',
    },
  });
  const data = await res.json();
  dispatch({ type: ATTENDING_EVENTS, payload: data });
};

export const setEventDetails = (eventDetails) => ({
  type: SET_EVENT_DETAILS,
  payload: eventDetails,
});

export const reserveEvent = (eventDetails) => async (dispatch) => {
  dispatch({ type: LOADING });

  await fetch(`${URL}attendances`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ attendance: eventDetails }),
  });

  const res = await fetch(`${URL}attendances`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      Accept: 'application/json',
    },
  });

  const data = await res.json();

  dispatch({ type: ATTENDING_EVENTS, payload: data });
};

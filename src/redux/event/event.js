import URL from '../../utils/commons';

// Action Types
const LOADING = 'LOADING';
const CREATE_EVENT = 'CREATE_EVENT';
const ALL_EVENTS = 'ALL_EVENTS';
const ATTENDING_EVENTS = 'ATTENDING_EVENTS';

// Initial State
const initialState = { loading: true, events: [] };

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case CREATE_EVENT:
      return { loading: false, events: [...state.events, action.payload] };
    case ALL_EVENTS:
      return { loading: false, events: action.payload };
    case ATTENDING_EVENTS:
      return { loading: false, events: action.payload };
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

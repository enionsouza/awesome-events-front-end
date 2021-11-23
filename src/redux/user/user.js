import URL from '../../utils/commons';

// Action Types
const SIGN_UP = 'SIGN_UP';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const FETCH_USER = 'FETCH_USER';

// Initial State
const initialState = {
  name: '',
  id: '',
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return action.payload;
    case SIGN_IN:
      return action.payload;
    case SIGN_OUT:
      return initialState;
    case FETCH_USER:
      return action.payload;
    default:
      return state;
  }
};

// Action Creators
export const signUp = (name, email, password, passwordConfirmation) => (dispatch) => {
  const user = {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  };

  const payload = {};

  fetch(`${URL}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ user }),
  })
    .then((res) => res.json())
    .then((data) => {
      payload.name = data.user.name;
      payload.id = data.user.id;
      localStorage.token = JSON.stringify(data.user.token);
    });

  dispatch({ type: SIGN_UP, payload });
};

export const signIn = (email, password) => async (dispatch) => {
  const user = {
    email,
    password,
  };
  const payload = {};

  const res = await fetch(`${URL}users/sign_in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ user }),
  });
  const data = await res.json();

  localStorage.token = JSON.stringify(data.user.token);

  payload.name = data.user.name;
  payload.id = data.user.id;

  dispatch({ type: SIGN_IN, payload });
};

export const signOut = () => async (dispatch) => {
  await fetch(`${URL}users/sign_out`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.token)}`,
    },
  });
  localStorage.clear();

  dispatch({ type: SIGN_OUT });
};

export const fetchUser = () => async (dispatch) => {
  const payload = {};

  if (localStorage.token) {
    const res = await fetch(`${URL}logged_user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.token)}`,
      },
    });
    const data = await res.json();

    payload.name = data.user.name;
    payload.id = data.user.id;
  } else {
    payload.name = initialState.name;
    payload.id = initialState.id;
  }

  dispatch({ type: FETCH_USER, payload });
};

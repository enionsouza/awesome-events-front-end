import URL from '../../utils/commons';

// Actions
const SIGN_UP = 'SIGN_UP';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';

// Initial State
const initialState = {
  name: '',
  email: '',
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
      payload.email = data.user.email;
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

  const userRes = await fetch(`${URL}logged_user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.token)}`,
    },
  });
  const userData = await userRes.json();

  payload.name = userData.user.name;
  payload.email = userData.user.email;

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

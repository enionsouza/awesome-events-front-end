import URL from '../../utils/commons';

// Action Types
const CREATE_EVENT = 'CREATE_EVENT';

// Initial State
const initialState = [];

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return action.payload;
    default:
      return state;
  }
};

// Action Creators
export const createEvent = (formData) => (dispatch) => {
  // const payload = {};

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
      console.log(data);
    });
  dispatch({ type: CREATE_EVENT });
};

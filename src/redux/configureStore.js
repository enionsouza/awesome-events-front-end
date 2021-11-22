import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/user';
import eventsReducer from './event/event';

const reducer = combineReducers({
  user: userReducer,
  events: eventsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

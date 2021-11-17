import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/user';

const reducer = combineReducers({
  user: userReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

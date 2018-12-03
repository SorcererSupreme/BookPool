import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer.js';
import BookReducer from './BookReducer';

export default combineReducers({
    LoginReducer,
    BookReducer
})
import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer.js';
import BookReducer from './BookReducer';
import BookFetchReducer from './BookFetchReducer'

export default combineReducers({
    LoginReducer,
    BookReducer,
    BookFetchReducer
})
import store from '../../store';
import Axios from 'axios';

export function bookFetchInitiated(){
    return {
        type: "BOOK_FETCH_INITIATED",
        payload: {}
    }
}

export function bookFetchFailed(error){
    return {
        type: "BOOK_FETCH_FAILED",
        payload: {
            message: error
        }
    }  
}


export function bookFetchSuccess(books_list){
    return {
        type: "BOOK_FETCH_SUCCESS",
        payload: {
            books_list: books_list
        }
    }
}



export const thunk_book_fetch_action = () =>{

    store.dispatch(bookFetchInitiated());
    return function(dispatch, getState) {
        console.log(getState())
        return Axios({
                    method: 'get',
                    url: 'http://localhost:8080/book/',
                    withCredentials: true
                })
                .then((response) => {
                        console.log(response);
                        dispatch(bookFetchSuccess(response.data));
                })
                .catch(err => dispatch(bookFetchFailed()));
    }
}
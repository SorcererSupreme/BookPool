import store from '../../store';
import Axios from 'axios';

export function bookChanged(event){
    var name = event.target.name;
    var book_action =  {
        type: "BOOK_CHANGED",
        payload: {}
    }
    book_action['payload'][name] = event.target.value;
    return book_action;
}

export function bookAddInitiated(){
    return {
        type: "BOOK_ADD_INITIATED",
        payload: {}
    }
}

export function bookAddFailed(error){
    return {
        type: "BOOK_ADD_FAILED",
        payload: {
            message: error
        }
    }  
}


export function bookAddSuccess(){
    return {
        type: "BOOK_ADD_SUCCESS",
        payload: {
            message: "book added successfully"
        }
    }
}



export const thunk_book_add_action = () =>{

    store.dispatch(bookAddInitiated());
    return function(dispatch, getState) {
        console.log(getState());
        var data = {
            book_name: getState().BookReducer.book_name,
            authors_list: getState().BookReducer.authors_list,
            genre: getState().BookReducer.genre
        }
        return Axios({
                    method: 'post',
                    url: 'http://localhost:8080/book/add',
                    data: data,
                    withCredentials: true
                })
                .then((response) => {
                        console.log(response);
                        dispatch(bookAddSuccess());
                })
                .catch(err => dispatch(bookAddFailed()));
    }
}
import store from '../../store';
import Axios from 'axios';

export function authInitiated(){
    return {
        type: "AUTH_INITIATED",
        payload: {
        }
    }
}

export function loginSuccess(userName){
    return {
        type: "AUTH_SUCCESS",
        payload: {
            userName: userName
        }
    }
}

export function loginError(error){
    return {
        type: "AUTH_ERROR",
        payload: {
            error: error
        }
    }
}

export const thunk_login_action = () =>{

    store.dispatch(authInitiated());
    return function(dispatch, getState) {

        return Axios.get('http://localhost:8080/state',{
                    withCredentials: true
                })
                .then((response) => {
                        console.log(response);
                        dispatch(loginSuccess(response.data.user_name))
                })
                .catch(err => dispatch(loginError(err)));
    }
}
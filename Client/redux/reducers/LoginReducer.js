const initialState = {
    userName: "",
    isLoggedIn: false,
    error: null
}

export default function reducer(state = initialState, action){
    //here two actions will take place if i go with the isFetched, thunk implementation!
    switch(action.type) {
        case "AUTH_INITIATED":
            return {
                userName: state.userName,
                isLoggedIn: false,
                error:null
            }

        case "AUTH_SUCCESS":
            return {
                userName: action.payload.userName,
                isLoggedIn: true,
                error: null
            }

        case "AUTH_ERROR":
            return {
                userName: state.userName,
                isLoggedIn: false,
                error: action.payload.error
            }

        default:
            return state;
    }
}

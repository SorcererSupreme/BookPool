const initialState = {
    books_list: []
}

export default function reducer(state = initialState, action){
    //here two actions will take place if i go with the isFetched, thunk implementation!
    switch(action.type) {
        case "BOOK_FETCH_SUCCESS":
            var newState = {
                books_list: action.payload.books_list
            }
            return newState;

        default:
            return state;
    }
}

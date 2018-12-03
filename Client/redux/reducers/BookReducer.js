const initialState = {
    book_name: "",
    authors_list: [],
    genre: []
}

export default function reducer(state = initialState, action){
    //here two actions will take place if i go with the isFetched, thunk implementation!
    switch(action.type) {
        case "BOOK_CHANGED":
            var newState = {
                book_name: state.book_name,
                authors_list: state.authors_list,
                genre: state.genre
            }
            var state_prop = Object.keys(action.payload)[0];
            newState[state_prop] = action.payload[state_prop];
            return newState;

        default:
            return state;
    }
}

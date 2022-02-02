const initialState = {
}

function rootReducer(state = initialState, action){
    if (action.type === "GET_COUNTRIES"){
        return {
            ...state,
            countriesList: action.payload.search
        };
    }
    if (action.type === "GET_COUNTRY"){
        return {
            ...state,
            countryDetail: action.payload
        }
    }
    if (action.type === "GET_ACTIVITY"){
        return {

        }
    }
    if (action.type === ""){

    }
    return state;
}




export default rootReducer;
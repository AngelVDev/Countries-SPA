const BASE_URL = "http://localhost:3000"

export function getCountries(){
    return function(dispatch){
        return fetch(`${BASE_URL}/all`)
        .then(response => response.json())
        .then( countries => {
            dispatch({ 
            type: "GET_COUNTRIES",
            payload: countries
        });
        })
    };
}

export function getCountry(name){
    return function(dispatch){
        return fetch(`${BASE_URL}/${name}`)
        .then(response => response.json())
        .then( detail => {
            dispatch({ type: "GET_COUNTRY", payload: detail});
        })
    };
}
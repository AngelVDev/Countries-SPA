const initialState = {
  countries: [],
  filteredCountries: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === "FETCH_COUNTRIES") {
    return {
      ...state,
      countriesList: action.payload,
    };
  }
  if (action.type === "GET_COUNTRY") {
    return {
      ...state,
      countryDetail: action.payload,
    };
  }
  if (action.type === "GET_ACTIVITY") {
    return {};
  }
  if (action.type === "") {
  }
  return state;
}

export default rootReducer;

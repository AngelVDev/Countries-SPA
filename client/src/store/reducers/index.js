const initialState = {
  countries: [],
  activities: [],
  countryDetail: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_COUNTRIES':
      return {
        ...state,
        countries: payload,
      };
    case 'GET_ACTIVITY':
      return {
        ...state,
        activities: payload,
      };
    case 'CREATE_ACTIVITY':
      return {
        ...state,
      };
    case 'GET_COUNTRY':
      return {
        ...state,
        countryDetail: payload,
      };
    case 'SEARCH_COUNTRY':
      return {
        ...state,
        countries: payload,
      };
    case 'SORT_BY_NAME':
      let countriesByName =
        payload === 'ASC'
          ? state.countries.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              else return 0;
            })
          : state.countries.sort((a, b) => {
              if (a.name < b.name) return 1;
              if (b.name < a.name) return -1;
              else return 0;
            });
      return {
        ...state,
        countries: countriesByName,
      };
    default:
      return state;
  }
};

export default reducer;

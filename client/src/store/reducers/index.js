const initialState = {
  countries: [],
  activities: [],
  countryDetail: [],
};
//....
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_COUNTRIES":
      return {
        ...state,
        countries: payload,
      };
    case "GET_ACTIVITY":
      return {
        ...state,
        activities: payload,
      };
    case "CREATE_ACTIVITY":
      return {
        ...state,
      };
    case "GET_COUNTRY":
      return {
        ...state,
        countryDetail: payload,
      };
    case "SEARCH_COUNTRY":
      return {
        ...state,
        countries: payload,
      };
    case "SORT_BY_NAME":
      let orderByName =
        payload === "ASC"
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
        countries: orderByName,
      };
    case "SORT_BY_POPULATION":
      let orderByPopulation =
        payload === "LOW"
          ? state.countries.sort((a, b) => {
              if (a.population > b.population) return 1;
              if (b.population > a.population) return -1;
              else return 0;
            })
          : state.countries.sort((a, b) => {
              if (a.population < b.population) return 1;
              if (b.population < a.population) return -1;
              else return 0;
            });
      return {
        ...state,
        countries: orderByPopulation,
      };
    case "FILTER_CONTINENT":
      let filterContinent =
        payload === "All"
          ? state.countries
          : state.countries.filter((country) =>
              country.continent.includes(payload)
            );
      return {
        ...state,
        countries: filterContinent,
      };
    case "FILTER_ACTIVITY":
      let filterActivity =
        payload === "All"
          ? state.countries
          : state.countries.filter(
              (country) =>
                country.activities &&
                country.activities.map((a) => a.name).includes(payload)
            );
      return {
        ...state,
        countries: filterActivity,
      };

    default:
      return state;
  }
};

export default reducer;

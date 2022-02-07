import axios from "axios";
const BASE_URL = "http://localhost:3001";

export function fetchCountries() {
  return function (dispatch) {
    axios
      .get(`${BASE_URL}/api/all`)
      .then((response) => response.json())
      .then((countries) => {
        dispatch({
          type: "FETCH_COUNTRIES",
          payload: countries,
        });
      });
  };
}

export function getCountry(name) {
  return function (dispatch) {
    return fetch(`${BASE_URL}/${name}`)
      .then((response) => response.json())
      .then((detail) => {
        dispatch({ type: "GET_COUNTRY", payload: detail.data });
      });
  };
}

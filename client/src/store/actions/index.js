import axios from "axios";
const BASE_URL = "http://localhost:3001/api";

export function fetchCountries() {
  return function (dispatch) {
    axios
      .get(`${BASE_URL}/countries`)
      .then((response) => response.json())
      .then((countries) => {
        dispatch({
          type: "FETCH_COUNTRIES",
          payload: countries.data,
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
export let getActivities = () => {
  return async (dispatch) => {
    try {
      let activities = await axios.get(`${BASE_URL}/activity`);
      return dispatch({
        type: "GET_ACTIVITIES",
        payload: activities.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export let createActivity = (payload) => {
  return async (dispatch) => {
    try {
      let newActivity = await axios.post(`${BASE_URL}/activity`, payload);
      return dispatch({
        type: "CREATE_ACTIVITY",
        payload: newActivity.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export let orderByName = (payload) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "SORT_BY_NAME",
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export let orderByPopulation = (payload) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "SORT_BY_POPULATION",
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export let filterContinent = (payload) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "FILTER_CONTINENT",
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export let filterActivity = (payload) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "FILTER_ACTIVITY",
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export function searchCountry(name) {
  return function (dispatch) {
    return fetch(`${BASE_URL}/countries?name=${name}`)
      .then((response) => response.json())
      .then((countries) => {
        dispatch({
          type: "SEARCH_COUNTRY",
          payload: countries.data,
        });
      });
  };
}

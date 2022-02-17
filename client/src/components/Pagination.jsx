// import React from "react";
import { fetchCountries } from "../store/actions";

const gotFetched = async () => {
  const countries = await fetchCountries.json();
  return countries.results;
};
export default gotFetched;

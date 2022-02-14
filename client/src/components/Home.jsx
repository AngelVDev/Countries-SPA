import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  getActivities,
  orderByName,
  orderByPopulation,
  filterActivity,
  filterContinent,
} from "../store/actions";
import { Link } from "react-router-dom";
import Country from "./Country";
import styled from "styled-components";
import SearchBar from "./SearchBar";

export const Home = () => {
  let countries = useSelector((state) => state.countries);
  let dispatch = useDispatch();
  let activities = useSelector((state) => state.activities);
  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(getActivities());
  }, [dispatch]);
  let handlefilterContinent = (e) => {
    e.preventDefault();
    dispatch(filterContinent(e.targetValue));
  };
  let handlefilterActivity = (e) => {
    e.preventDefault();
    dispatch(filterActivity(e.targetValue));
  };
  let handleName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.targetValue));
  };
  let handlePopulation = (e) => {
    e.preventDefault();
    dispatch(orderByPopulation(e.targetValue));
  };
  return (
    <div>
      <h1>All the countries in THE WORLD</h1>
      <SearchBar />
      <nav>
        <Link to="/activity">
          <button>Create an activity</button>
        </Link>
        <div>
          <label>Filter by continent:</label>
          <select onChange={handlefilterContinent}>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Filter by activity/ies</label>
          <select onChange={handlefilterActivity}>
            <option value="ALL">All</option>
            {activities &&
              activities.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="">Order: name</label>
          <select onChange={handleName}>
            <option value="ASC">¡A-Z!</option>
            <option value="DSC">¡Z-A!</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Order: population</label>
          <select onChange={handlePopulation}>
            <option value="LOW">Low to high</option>
            <option value="HI">High to low</option>
          </select>
        </div>
      </nav>
      <Country></Country>
    </div>
  );
};

export default Home;

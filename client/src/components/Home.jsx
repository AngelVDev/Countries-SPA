import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryCard from "./CountryCard";
import {
  fetchCountries,
  getActivities,
  orderByName,
  orderByPopulation,
  filterActivity,
  filterContinent,
} from "../store/actions";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

const Home = () => {
  let dispatch = useDispatch();
  let { countries } = useSelector((state) => state);
  let { activities } = useSelector((state) => state);

  let [currentPage, setCurrentPage] = useState(1);
  let [countriesPage, setCountriesPage] = useState(9);
  let lastCountry = currentPage * countriesPage;
  let indFirstCountry = lastCountry - countriesPage;
  let currentCountries = countries.slice(indFirstCountry, lastCountry);

  let pagination = (pageN) => {
    if (pageN !== 1) {
      setCountriesPage(10);
      setCurrentPage(pageN);
    } else {
      setCountriesPage(9);
      setCurrentPage(pageN);
    }
  };

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

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(getActivities());
  }, [dispatch]);
  return (
    <div>
      <h1>All the countries in THE WORLD</h1>
      <nav>
        <Link to="/activity">
          <button>Create an activity</button>
        </Link>
        <SearchBar />
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
          <label>Filter by activity/ies</label>
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
          <label>Order: name</label>
          <select onChange={handleName}>
            <option value="ASC">¡A-Z!</option>
            <option value="DSC">¡Z-A!</option>
          </select>
        </div>
        <div>
          <label>Order: population</label>
          <select onChange={handlePopulation}>
            <option value="LOW">Low to high</option>
            <option value="HI">High to low</option>
          </select>
        </div>
      </nav>
      <Pagination
        countriesPage={countriesPage}
        allCountries={countries.length}
        pagination={pagination}
      />
      <div>
        {currentCountries &&
          currentCountries.map((c) => (
            <CountryCard
              key={c.id}
              flag={c.flag}
              continent={c.continent}
              id={c.id}
            />
          ))}
      </div>
      <Pagination
        countriesPage={countriesPage}
        allCountries={countries.length}
        pagination={pagination}
      />
    </div>
  );
};

export default Home;

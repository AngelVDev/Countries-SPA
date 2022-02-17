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
import gotFetched from "./Pagination";
import { DIV } from "./Landing";
import styled from "styled-components";
import { Loading } from "./Loading";

const Home = () => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state);
  const { activities } = useSelector((state) => state);
  // <-------INFINITY SCROLL ------->
  const [page, setPage] = useState(1);
  const [fetched, setFetched] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    // console.log("scrollTop:", scrollTop);
    // console.log("clientHeight", clientHeight);
    // console.log("scrollHeight", scrollHeight);
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const loadFetched = async () => {
      setLoading(true);
      const newFetch = await gotFetched(page);
      setFetched((prev) => [...prev, ...newFetch]);
      setLoading(false);
    };
    loadFetched();
  }, [page]);
  // <-------INFINITY SCROLL ------->
  // let [currentPage, setCurrentPage] = useState(1);
  // let [countriesPage, setCountriesPage] = useState(9);
  // let lastCountry = currentPage * countriesPage;
  // let indFirstCountry = lastCountry - countriesPage;
  // let currentCountries = countries.slice(indFirstCountry, lastCountry);

  // let pagination = (pageN) => {
  //   if (pageN !== 1) {
  //     setCountriesPage(10);
  //     setCurrentPage(pageN);
  //   } else {
  //     setCountriesPage(9);
  //     setCurrentPage(pageN);
  //   }
  // };

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
    <DIV>
      <h1>Countries of THE WORLD</h1>
      <nav>
        <Link to="/activity">
          <button>Create an activity</button>
        </Link>
        <SearchBar />
        <div>
          <label>Filter by continent: </label>
          <Select onChange={handlefilterContinent}>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </Select>
        </div>
        <div>
          <label>Filter by activity/ies: </label>
          <Select onChange={handlefilterActivity}>
            <option value="ALL">All</option>
            {activities &&
              activities.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
          </Select>
        </div>
        <div>
          <label>Sort by name: </label>
          <Select onChange={handleName}>
            <option value="ASC">¡A-Z!</option>
            <option value="DSC">¡Z-A!</option>
          </Select>
        </div>
        <div>
          <label>Sort by population: </label>
          <Select onChange={handlePopulation}>
            <option value="LOW">Low to high</option>
            <option value="HI">High to low</option>
          </Select>
        </div>
      </nav>
      <DIV onScroll={handleScroll}>
        {fetched &&
          fetched.map((fetchx) => (
            <CountryCard key={fetched.cell} fetched={fetchx} />
          ))}
      </DIV>
      {loading && <Loading>Loading...</Loading>}
    </DIV>
  );
};
export const Select = styled.select`
  background-color: #e26c6c;
  color: white;
  outline: 2px dashed #ffb12e;
  outline-offset: 2px;
  font-family: "Alegreya Sans SC";
  font-weight: bold;
`;

export default Home;

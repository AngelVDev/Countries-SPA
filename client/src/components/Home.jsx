import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../store/actions";
import Country from "./Country";
import styled from "styled-components";
import SearchBar from "./SearchBar";

export const Home = () => {
  let countries = useSelector((state) => state.countries);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  return (
    <div>
      <DIV>
        <SearchBar />
      </DIV>
      {countries.map((country) => {
        return <Country name={country} image={country.flag}></Country>;
      })}
    </div>
  );
};

const DIV = styled.div``;
export default Home;

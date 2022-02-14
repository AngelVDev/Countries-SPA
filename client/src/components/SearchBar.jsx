import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountry } from "../store/actions/index";
import { DIV } from "./Landing";
const SearchBar = () => {
  let dispatch = useDispatch();
  let [name, setName] = useState("");
  let handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountry(name));
  };
  return (
    <DIV>
      <input
        type="text"
        placeholder="Search smthng..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </DIV>
  );
};
export default SearchBar;

// import { React } from "react";
// import { Link } from "react-router-dom";
import { createActivity, fetchCountries } from "../store/actions";
import styled from "styled-components";
import Country from "./Country";

const Activitor = () => {
  return (
    <div>
      <Country />
    </div>
  );
};

export default Activitor;

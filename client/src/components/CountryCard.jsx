import React from "react";
import { Link } from "react-router-dom";
// import { DIV } from "./Landing";
import "./CountryCard.css";

const CountryCard = ({ name, flag, continent, id }) => {
  return (
    <div>
      <div>
        <img src={flag} alt={name} />
        <Link to={"/countries/" + id}>
          <button>More</button>
        </Link>
      </div>
      <div>
        <h3>{name}</h3>
        <h3>{continent}</h3>
      </div>
    </div>
  );
};

export default CountryCard;

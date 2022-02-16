import React from "react";
import { Link } from "react-router-dom";
const CountryCard = ({ name, flag, continent, id }) => {
  return (
    <div>
      <div>
        <img src={flag} alt={name} />
        <Link to={"/countries/" + id}>
          <button>+</button>
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

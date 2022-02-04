// import React from "react";

// const Card = ({ name, flags }) => {
//   return (
//     <div>
//       <h1>Soy flag</h1>
//       <h2>{name}</h2>
//       <img src="{flags}" alt="Dis a broken.flag" width="2rem" height="2rem" />
//     </div>
//   );
// };
// export default Card;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../store/actions";
import Country from "./Country";

export default function Countries() {
  let countries = useSelector((state) => state.countries);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  return (
    <div>
      {countries.map((country) => {
        return <Country name={country} image={country.flag}></Country>;
      })}
    </div>
  );
}

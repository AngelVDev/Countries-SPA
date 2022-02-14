import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCountry } from "../store/actions";

export default function Country() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { countryInfo } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getCountry(id));
  }, [dispatch, id]);
  return (
    <div>
      <h1>Country details:</h1>
      <nav>
        <Link to="/countries">
          <button>To Home</button>
        </Link>
      </nav>
      {!countryInfo ? (
        <h2>Loading...</h2>
      ) : (
        <div key={countryInfo.id}>
          <div>
            <h2>Name:</h2> <p>{countryInfo.name ? countryInfo.name : null}</p>
          </div>
          <div>
            <h2>Code:</h2>
            <p>{countryInfo.id ? countryInfo.id : null}</p>
          </div>
          <div>
            <h2>Continent: </h2>
            <p>{countryInfo.continent ? countryInfo.continent : null}</p>
          </div>
          <div>
            <h2>Capital: </h2>
            <p>{countryInfo.capital ? countryInfo.capital : null}</p>
          </div>
          <div>
            <h2>Subregion: </h2>
            <p>{countryInfo.subregion ? countryInfo.subregion : null}</p>
          </div>
          <div>
            <h2>Area: </h2>
            <p>{countryInfo.area ? countryInfo.area : null} km2</p>
          </div>
          <div>
            <h2>Population: </h2>
            <p>{countryInfo.population ? countryInfo.population : null}</p>
          </div>
          <div>
            <h2>Activities: </h2>
            <p>
              {countryInfo.activities
                ? countryInfo.activities.map((a) => a.name).join(", ")
                : "No hay actividades"}
            </p>
          </div>
          <div>
            <img src={countryInfo.flag} alt={countryInfo.name} />
          </div>
        </div>
      )}
    </div>
  );
}

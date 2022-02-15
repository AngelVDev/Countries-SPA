import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createActivity, fetchCountries } from "../store/actions";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const Activitor = () => {
  const dispatch = useDispatch();
  const { error, setError } = useState({});
  const { input, setInput } = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  let validate = () => {
    let error = {};
    if (!input.name) error.name = "Name required";
    else if (!input.difficulty) error.difficulty = "Set difficulty, please";
    else if (!input.duration) error.duration = "Select a duration, I beg you";
    else if (!input.season) error.season = "季節を選んでください";
    return error;
  };

  let handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  let handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createActivity(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    alert("¡Successful creation!");
  };
  let handleCheckbox = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });
    }
  };
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <div>
      <h1>Create a turistic activity</h1>
      <nav>
        <Link to="/countries">
          <button>To home</button>
        </Link>
      </nav>
      <form onSubmit={handleOnSubmit}>
        <div>
          <div>
            <label>Activity:</label>
            <input
              type="text"
              placeholder="Activity name"
              value={input.name}
              name="name"
              onChange={handleOnChange}
            />
            {error.name && <p>{error.name}</p>}
          </div>
          <div>
            <label>Difficulty:</label>
            <select onChange={handleOnChange} name="difficulty">
              <option value="">-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {error.dificulty && <p className="error">{error.dificulty}</p>}
          </div>
          <div>
            <label>Duration:</label>
            <select onChange={handleOnChange} name="duration">
              <option value="">-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {error.duration && <p>{error.duration}</p>}
          </div>
          <div>
            <label>Season:</label>
            <select onChange={handleOnChange} name="season">
              <option value="">-</option>
              <option value="Summer">Summer</option>
              <option value="Spring">Spring</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
            </select>
            {error.season && <p>{error.season}</p>}
          </div>
          <div>
            <label>Countries:</label>
            <div>
              {countries &&
                countries.map((c) => {
                  return (
                    <div key={c.id}>
                      <label>{c.name}</label>
                      <input
                        type="checkbox"
                        value={c.name}
                        onChange={(e) => handleCheckbox(e)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <button type="submit">CREATE</button>
      </form>
    </div>
  );
};

export default Activitor;

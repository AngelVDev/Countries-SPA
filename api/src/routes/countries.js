const { Router } = require("express");
const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const router = Router();

const getCountry = async () => {
  try {
    const countryAPI = await axios.get("https://restcountries.com/v3.1/all");
    const countryINFO = await countryAPI.data.map((country) => {
      return {
        name: country.name.common,
        id: country.cca3,
        flags: country.flags[1] ? country.flags[1] : "No flag here",
        continent: country.continents[0],
        capital: country.capital != null ? country.capital : "No capital",
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    });
    return countryINFO;
  } catch (error) {
    return console.log(error);
  }
};

const dbCountries = async (_req, _res, next) => {
  try {
    const dbCountry = await Country.findAll({ include: Activity });

    return dbCountry;
  } catch (error) {
    next(error);
  }
};

const allCountries = async () => {
  let countryAPI = await getCountry();
  let dbCountry = await dbCountries();
  let total = dbCountry.concat(countryAPI);
  return total;
};

router.get("/countries", async (req, res) => {
  let { name } = req.query;
  let countryINFO = await allCountries();
  if (name) {
    let { name } = req.query;
    let countryName = countryINFO.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send(`Can't find ${name} `);
  } else {
    res.status(200).send(countryINFO);
  }
});
const getCountryByID = async (req, res) => {
  const id = req.params.id;
  let countryId = await Country.findByPk(id.toUpperCase(), {
    include: {
      model: Activity,
    },
  });
  console.log("Me trae ésto:", countryId);
  if (countryId) {
    return res.status(200).send(countryId);
  } else {
    return res.status(404).send("Can't find it");
  }
};

router.get("/countries/:id", getCountryByID);

module.exports = router;

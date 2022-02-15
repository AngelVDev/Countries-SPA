const { Router } = require("express");
const { Country, Activity } = require("../db");
const axios = require("axios");
const { Sequelize } = require("sequelize");
const router = Router();

const getCountry = async () => {
  try {
    const countryAPI = await axios.get("https://restcountries.com/v3.1/all");
    const countryINFO = await countryAPI.data.map((country) => {
      return {
        name: country.name.common,
        id: country.cca3,
        flags: country.flags[0] ? country.flags[0] : "No flag here",
        continent: country.continents[0],
        capital: country.capital != null ? country.capital : "No capital",
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    });
    return countryINFO;
  } catch (error) {
    console.log(error);
  }
};
const getDbCountries = async (req, res) => {
  let allDbCountries = await getCountry(); //la info de la API, mapeada
  let { name } = req.query;
  try {
    let STORED = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    if (!STORED.length) {
      //se supone que acá los debería estar pasando a la tabla
      await Country.bulkCreate(allDbCountries);
    }
  } catch (error) {
    console.log(error);
  }
  try {
    if (name) {
      let countryName = await Country.findAll({
        where: {
          name: {
            [Sequelize.Op.iLike]: `%${name.toLowerCase()}%`,
          },
        },
      });
      countryName.length
        ? res.status(200).send(countryName)
        : res.status(404).send("Can't find the country");
    } else {
      let STORED = await Country.findAll({
        include: {
          model: Activity,
        },
      });
      res.status(200).send(STORED);
    }
  } catch (error) {
    console.log(error);
  }
};
let er = getDbCountries("argentina");
console.log(er);
const getAllCountries = async () => {
  let apiINFO = await getCountry();
  let dbINFO = await getDbCountries();
  let totalINFO = apiINFO.concat(dbINFO);
  return totalINFO;
};

router.get("/countries", async () => {
  const name = req.query.name;
  let countriesTotal = await getAllCountries();
  if (name) {
    let countryName = await countriesTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send("Nope");
  } else {
    res.status(200).send(countriesTotal);
  }
});

router.get("countries/:id", async () => {
  const { id } = req.params;
  if (id) {
    let countryId = await await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
      },
    });
    res.status(200).send(countryId);
    res.status(404).send("Can't find it");
  }
});

module.exports = router;

const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const API = async () => {
  try {
    const countryAPI = await axios.get("https://restcountries.com/v3.1/all");
    const countryINFO = await countryAPI.data.map((country) => {
      return {
        name: country.name.common,
        id: country.cca3,
        flag: country.flags["svg"],
        continent: country.continents,
        capital: country.capital,
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
const almostEVERYTHING = async (req, res) => {
  let allCountries = await API();
  let { name } = req.query;
  try {
    let full = await Country.findAll({
      include: { model: Activity },
    });
    if (!full.length) {
      console.log(await Country.bulkCreate(allCountries));
    }
  } catch (error) {
    console.log(
      "%c El error es éste => ",
      "background: #222; color: #bada55",
      error
    );
  }
  if (name) {
    let countryName = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name.toLowerCase()}%`,
        },
      },
    });
    console.log(
      "%c Yo soy countryName:",
      "background: #222; color: #bada55",
      countryName
    );
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send(`Can't find ${name}`);
  } else {
    let full = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    res.status(200).send(full);
  }
};
//   const dbCountries = async (req, res, next) => {
//     let countries = await getCountry();
//     try {
//       let dbCountry = await Country.findAll({
//         include: { model: Activity },
//       });
//       if (!dbCountry.length) {
//         await Country.bulkCreate(countries);
//       }
//       return dbCountry;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const allCountries = async () => {
//     let countryAPI = await getCountry();
//     let dbCountry = await dbCountries();
//     let total = [...dbCountry, ...countryAPI];
//     return total;
//   };
//CON QUERY
//   let { name } = req.query;
//   let countryINFO = await allCountries();
//   if (name) {
//     let countryName = countryINFO.filter((el) =>
//       el.name.toLowerCase().includes(name.toLowerCase())
//     );
//     countryName.length
//       ? res.status(200).send(countryName)
//       : res.status(404).send(`Can't find ${name} `);
//   } else {
//     res.status(200).send(countryINFO);
//   }

const getCountryByID = async (req, res) => {
  const { id } = req.params;
  try {
    let countryId = await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
      },
    });
    if (countryId && countryId !== null) {
      return res.status(200).send(countryId);
    } else {
      return res.status(404).send("Can't find it");
    }
  } catch (err) {
    console.log(err);
  }
};
router.get("/countries", almostEVERYTHING);

router.get("/countries/:id", getCountryByID);

module.exports = router;

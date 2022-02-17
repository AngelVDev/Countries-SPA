const { Router } = require("express");
const router = Router();
const { Country, Activity, CountryActivity } = require("../db");
const axios = require("axios");
const { Sequelize } = require("sequelize");

const API = async (req, res) => {
  try {
    const countryAPI = await axios.get("https://restcountries.com/v3.1/all");
    const countryINFO = await countryAPI?.data.map((country) => {
      return {
        name: country.name.common,
        id: country.cca3,
        flag: country.flags["svg"] ? country.flags["svg"] : "No flag here",
        continent: country.continents,
        capital: country.capital
          ? country.capital.join(",")
          : "No capital here",
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    });
    return countryINFO;
  } catch (error) {
    return console.log("La re puta madre");
  }
};
// const dbCountries = async (req, res, next) => {
//   let countries = await API();
//   try {
//     let dbCountry = await Country.findAll({
//       include: { model: Activity },
//     });
//     if (!dbCountry.length) {
//       await Country.bulkCreate(countries);
//     }
//     return dbCountry;
//   } catch (error) {
//     console.log("Qué tipo choto");
//   }
// };

// const allCountries = async () => {
//   try {
//     let countryAPI = await API();
//     let dbCountry = await dbCountries();
//     let total = [...dbCountry, ...countryAPI];
//     return total;
//   } catch (error) {
//     console.log("RE ROMPIDO");
//   }
// };
// const almostEVERYTHING = async (req, res) => {
// };
async function getCountryByID(req, res) {
  const { id } = req.params;
  try {
    let countryId = await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
      },
    });
    if (countryId) {
      return res.status(200).send(countryId);
    } else {
      return res.status(404).send("Can't find it");
    }
  } catch (err) {
    console.log(err);
  }
}
// router.get("/countries", API);
router.get("/countries", async (req, res) => {
  // let countryINFO = await allCountries();
  let allCountries = await API();
  let { name } = req.query;
  try {
    let full = await Country.findAll({ include: { model: Activity } });
    if (!full.length) {
      await Country.bulkCreate(allCountries);
    }
    // if (name) {
    //   let countryName = countryINFO.filter((el) =>
    //     el.name.toLowerCase().includes(name.toLowerCase())
    //   );
    //   countryName.length
    //     ? res.status(200).send(countryName)
    //     : res.status(404).send(`Can't find ${name} `);
    // }
  } catch (error) {
    console.log({ msg: error });
    // res.status(200).send(countryINFO);
    console.log("SOS UNA BOSTA");
  }
  if (name) {
    let countryName = await Country.findAll({
      where: { name: { [Sequelize.Op.iLike]: `%${name.toLowerCase()}%` } },
    });
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send("No se encontró el país");
  } else {
    let full = await Country.findAll({
      include: { model: Activity },
    });
    res.status(200).send(full);
  }
});

router.get("/countries/:id", getCountryByID);

module.exports = router;

const { Router } = require('express');
const { Country, Activity } = require('../db');
const axios = require('axios');
const router = Router();

const getCountry = async () => {
  try {
    const countryAPI = await axios.get('https://restcountries.com/v3.1/all');
    const countryINFO = await countryAPI.data?.map((el) => {
      return {
        name: el.name,
        id: el.cca3,
        flag: el.flags[0] ? el.flags[0] : 'No flag',
        continent: el.continents,
        capital: el.capital ? el.capital : 'No capital',
        subregion: el.subregion,
        area: el.area,
        population: el.population,
      };
    });
    return countryINFO;
  } catch (error) {
    console.log(error);
  }
};

const getDbCountries = async () => {
  let allDbCountries = await getCountry();
  let { name } = req.query;
  return await Country.findAll({
    include: {
      model: Activity,
    },
  });
};

const getAllCountries = async () => {
  let apiINFO = await getCountry();
  let dbINFO = await getDbCountries();
  let totalINFO = apiINFO.concat(dbINFO);
  return totalINFO;
};

router.get('/countries', async (req, res) => {
  const name = req.query;
  let countriesTotal = await getAllCountries();
  if (name) {
    let countryName = await countriesTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send('Ask Joe');
  } else {
    res.status(200).send(countriesTotal);
  }
});

router.get('countries/:id', async (req, res) => {
  const id = req.params.id;
  const countriesTotal = await getAllCountries();
  if (id) {
    let countryId = await countriesTotal.filter((el) => el.id == id);
    countryId.length
      ? res.status(200).send(countryId)
      : res.status(404).send("Can't find it");
  }
});

module.exports = router;

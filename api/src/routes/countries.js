const { Router } = require('express');
const { Country, Activity } = require('../db');
const axios = require('axios');
const router = Router();

const getCountry = async () => {
  try {
    const countryAPI = await axios.get('https://restcountries.com/v3.1/all');
    const countryINFO = await countryAPI.data?.map((country) => {
      return {
        name: country.name.common,
        id: country.cca3,
        flag: country.flags[0] ? country.flags[0] : 'No flag',
        continent: country.continents,
        capital: country.capital /*? country.capital : 'No capital' */,
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
let pera = getCountry();
console.log(pera);

const getDbCountries = async () => {
  try {
    let allDbCountries = await getCountry();
    return await Country.findAll({
      include: {
        model: Activity,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
let papa = getDbCountries();
console.log(papa);

const getAllCountries = async () => {
  let apiINFO = await getCountry();
  let dbINFO = await getDbCountries();
  let totalINFO = apiINFO.concat(dbINFO);
  return totalINFO;
};
let zanahoria = getAllCountries();
console.log(zanahoria);

router.get('/countries', async () => {
  const name = req.query;
  let countriesTotal = await getAllCountries();
  console.log(countriesTotal);
  if (name) {
    let countryName = await countriesTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send('Nope');
  } else {
    res.status(200).send(countriesTotal);
  }
});

router.get('countries/:id', async () => {
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

const { Router } = require("express");
const { Country, Activity } = require("../db");
const axios = require("axios");
const router = Router();

const getCountry = async () => {
  const countryAPI = await axios.get("https://restcountries.com/v3.1/all");
  const countryINFO = await countryAPI.data?.map((el) => {
    return {
      name: el.name,
      flag: el.flag,
      capital: el.capital,
      subregion: el.subregion,
      area: el.area,
      population: el.population,
    };
  });
  return countryINFO;
};

const getDbCountries = async () => {
  return await Country.findAll({
    include: {
      model: Activity,
    },
  });
};

const getAllCountries = async () => {
  const apiINFO = await getCountry();
  const dbINFO = await getDbCountries();
  const TotalINFO = apiINFO.concat(dbINFO);
  return TotalINFO;
};

router.get("/countries", async (req, res) => {
  const name = req.query;
  let countriesTotal = await getAllCountries();
  if (name) {
    let countryName = await countriesTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send("Ask Joe");
  } else {
    res.status(200).send(countriesTotal);
  }
});
router.get("countries/:id", async (req, res) => {
  const id = req.params.id;
  const countriesTotal = await getAllCountries();
  if (id) {
    let countryId = await countriesTotal.filter((el) => el.id == id);
    countryId.length
      ? res.status(200).send(countryId)
      : res.status(404).send("Can't find it");
  }
});

router.post("/activity", async (req, res) => {
  let activities = await getDbInfoActivities();
  let { name, difficulty, duration, season, countries } = req.body;
  if (name)
    activities = activities.filter(
      (el) => el.name.toLowerCase() === name.toLowerCase()
    );
  if (activities.length === 0) {
    if (!name || !difficulty || !season || !duration || countries.length == 0)
      res.status(404).send("Wow. So much empty fields");
    else {
      let activityCreated = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });
      let countryDb = await Country.findAll({
        where: { name: countries },
      });
      activityCreated.addCountry(countryDb);
      res.status(201).send("So much succesful creation");
    }
  } else {
    res.status(404).send("Wow. So much empty fields");
  }
});

module.exports = router;

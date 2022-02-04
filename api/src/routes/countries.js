const { Router } = require("express");
const { Country } = require("../db");
const axios = require("axios");

const router = Router();

router.get("/", (req, res, next) => {
  let countryApi = axios.get("https://restcountries.com/v3.1/name/all");
  let countryDb = Country.findAll();
  Promise.all([countryApi, countryDb]).then((response) => {
    const [countryApi, countryDb] = response;
    res.send(countryDb);
  });
});
router.get("/countries/:id", (req, res, next) => {
  res.send();
});
router.get('/countries?name="..."', (req, res, next) => {
  res.send();
});
// router.post('/activity', (req, res, next) => {
//     res.send()
// })

module.exports = router;

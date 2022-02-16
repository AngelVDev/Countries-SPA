const { Router } = require("express");
const { Country, Activity } = require("../db");
const router = Router();

const getDbInfoActivities = async (req, res, next) => {
  try {
    let activities = await Activity.findAll({
      include: Country,
    });
    if (activities) return res.status(200).send(activities);
    else return res.status(404).send("Cannot find activities");
  } catch (error) {
    console.log(error);
  }
};

router.get("/activity", getDbInfoActivities);

router.post("/activity", async (req, res) => {
  try {
    let { name, difficulty, duration, season, countries } = req.body;
    let freshActivity = await Activity.findOrCreate({
      name,
      difficulty,
      duration,
      season,
    });
    countries.forEach(async (country) => {
      let activityCountry = await Country.findOne({
        where: {
          name: country,
        },
      });
      await freshActivity.addCountry(activityCountry);
    });
    return res.status(201).json(freshActivity);
  } catch (error) {
    console.log(error);
    res.status(500).send("No such thing as 'SUCCESS' ");
  }
});

module.exports = router;

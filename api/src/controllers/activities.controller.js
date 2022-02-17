const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db");

const getDbInfoActivities = async (req, res, next) => {
  try {
    let activities = await Activity.findAll({
      include: Country,
    });
    if (activities) return res.send(activities);
    else return res.status(404).send("Cannot find activities");
  } catch (error) {
    next(error);
  }
};

const createActivity = async (req, res, _next) => {
  try {
    let { name, difficulty, duration, season, countries } = req.body;
    let newActivity = await Activity.create({
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
      await newActivity.addCountry(activityCountry);
    });
    return res.send("SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(500).send("No such thing as 'SUCCESS' ");
  }
};

router.get("/activity", getDbInfoActivities);
router.post("/activity", createActivity);

module.exports = router;

const { Router } = require('express');
const { Country, Activity } = require('../db');
const router = Router();

const getDbInfoActivities = async () => {
  return await Activity.findAll({
    include: {
      model: Activity,
    },
  });
};

router.get('/activities', async (req, res) => {
  const name = req.query.name;
  let activities = await getDbInfoActivities();
  if (name) {
    let activityName = await activities.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    activityName.length
      ? res.status(200).send(activityName)
      : res.status(404).send('Activity not found');
  } else {
    res.status(200).send(activities);
  }
});

router.post('/activities', async (req, res) => {
  let activities = await getDbInfoActivities();
  let { name, difficulty, duration, season, countries } = req.body;
  if (name)
    activities = activities.filter(
      (el) => el.name.toLowerCase() === name.toLowerCase()
    );
  if (activities.length === 0) {
    if (!name || !difficulty || !season || !duration || countries.length == 0)
      res.status(404).send('Wow. So much empty fields');
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
      activityCreated.addActivity(countryDb);
      res.status(201).send('So much succesful creation');
    }
  } else {
    res.status(404).send('Wow. So much empty fields');
  }
});

module.exports = router;

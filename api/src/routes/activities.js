// const { Router } = require("express");
// const { Activity } = require("../db");

// const router = Router();

// router.post("/activity", async (req, res) => {
//   let activities = await getDbInfoActivities();
//   let { name, difficulty, duration, season, countries } = req.body;
//   if (name)
//     activities = activities.filter(
//       (el) => el.name.toLowerCase() === name.toLowerCase()
//     );
//   if (activities.length === 0) {
//     if (!name || !difficulty || !season || !duration || countries.length == 0)
//       res.status(404).send("Wow. So much empty fields");
//     else {
//       let activityCreated = await Activity.create({
//         name,
//         difficulty,
//         duration,
//         season,
//       });
//       let countryDb = await Country.findAll({
//         where: { name: countries },
//       });
//       activityCreated.addCountry(countryDb);
//       res.status(201).send("So much succesful creation");
//     }
//   } else {
//     res.status(404).send("Wow. So much empty fields");
//   }
// });

// module.exports = router;

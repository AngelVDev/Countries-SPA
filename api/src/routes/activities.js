const { Router } = require("express");
const { Activity } = require("../db");

const router = Router();

router.get("/", (req, res, next) => {
  res.send();
});
router.post("/activity", (req, res, next) => {
  const { name } = req.body;
  return Activity.create({ name }).then((newAct) => {
    res.send(newAct);
  });
});
router.post("/activity", async (req, res, next) => {
  try {
    const { countryId, activityId } = req.params;
    const country = await Countries.findByPk(countryId);
    await country.addActivity(activityId);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});
// router.get('/countries/:id', (req, res, next) => {
//     res.send()
// })
// router.get('/countries?name="..."', (req, res, next) => {
//     res.send()
// })

module.exports = router;

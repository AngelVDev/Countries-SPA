const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Countries, Activities, CountryActivity } = require("../db");
const countriesRoute = require("./countries");
const activitiesRoute = require("./activities");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", countriesRoute);
router.use("/", activitiesRoute);

module.exports = router;

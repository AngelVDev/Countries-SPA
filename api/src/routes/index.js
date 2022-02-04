const { Router } = require("express");
const countriesRoute = require("./countries");
const activitiesRoute = require("./activities");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Countries } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countriesRoute);
router.use("/activity", activitiesRoute);
module.exports = router;

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country } = require ("../db")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

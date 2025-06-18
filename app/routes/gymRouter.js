const express = require('express');
const router = express.Router();

router.get('/ejercicios', (req, res) => {
    res.json({mensaje: 'Hola mundo desde gymRouter'})
});

module.exports = router

const express = require('express');
const router = express.Router();

const constrollerProd = require('../controllers/productos');

router.get('/getall', constrollerProd.getall );
router.get('/getone/:id', constrollerProd.getone );
router.post('/save', constrollerProd.createProduc);
router.put('/update/:id', constrollerProd.updateProduc);
router.delete('/delete/:id', constrollerProd.delete);

module.exports = router;
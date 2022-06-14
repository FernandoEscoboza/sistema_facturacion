
const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas');

router.get('/query_num_factura', ventasController.query_num_factura);
router.get('/getone/:id', ventasController.getone);
router.get('/temp_detventas/:idventas', ventasController.get_temp_detventas);
router.post('/temp_create', ventasController.create_temp_detventas);
router.post('/delete/:id', ventasController.delete_temp_detventas);
router.delete('/cancel/:id', ventasController.cancel_temp_detventas);
router.post('/opensales', ventasController.opensales);
router.post('/savedsales', ventasController.savedsales );
router.put('/updatesales/:id', ventasController.updatesales);

module.exports = router;


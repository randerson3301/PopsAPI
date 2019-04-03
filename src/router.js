const express = require('express');
const router = express.Router();

const promoController = require('./controller/promocaoController');
router.get('/promo/', promoController.get);


module.exports = router;
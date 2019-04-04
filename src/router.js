const express = require('express');
const router = express.Router();

const promoController = require('./controller/promocaoController');
router.get('/', promoController.get);

module.exports = router;
const express = require('express');
const router = express.Router();

//instanciando controllers
const promoController = require('./controller/promocaoController');
const userController =  require('./controller/userController');

//config route for promotions
router.get('/', promoController.get);
router.get('/subscribe/:user_id/:promo_id', promoController.subscribeUser);

//config routes to user operations
router.post('/add', userController.insert);
router.get('/:user_id', userController.selectById);
router.post('/update/:user_id', userController.update);
router.post('/update/password/:user_id', userController.updatePassword);

//export router
module.exports = router;
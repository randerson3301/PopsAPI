const express = require('express');
const router = express.Router();

//instanciando controllers
const promoController = require('./controller/promocaoController');
const userController =  require('./controller/userController');
const brindeController =  require('./controller/brindesController');

//config route for promotions
router.get('/promo', promoController.select);
router.get('/promo/subscribe/:user_id/:promo_id', promoController.subscribeUser); //com problemas -> undefined no WHERE

//config routes to user operations
router.get('/user/:user_id', userController.selectById);

router.post('/user/add', userController.insert);
router.post('/user/update/:user_id', userController.update);
router.post('/user/update/password/:user_id', userController.updatePassword);
router.post('/user/login', userController.login);

//config routes brindes
router.get('/brinde', brindeController.select);
router.get('/brinde/:brinde_id', brindeController.selectById);


//export router
module.exports = router;
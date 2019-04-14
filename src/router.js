const express = require('express');
const router = express.Router();

//instanciando controllers
const promoController = require('./controller/promocaoController');
const userController =  require('./controller/userController');
const brindeController =  require('./controller/brindesController');
const placesController =  require('./controller/estabelecimentosController');

//INDEX
router.get('/', function(req, res, next){
   
    res.status(200).send({
        title: "API de Contatos",
        version: "0.0.2",
        endpoints: {
            "/": "API index(this page)",
            "/contacts": "where you can se the contacts",
            "/contacts/id": "view the contact individually(selected by id)",
            "/address/id": "you can see the contact address"
        }
    });
});


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

//config routes lugares
router.get('/lugar/:q', placesController.searchPlaces);
router.get('/lugar/address/:cnpj', placesController.getAddress);

//export router
module.exports = router;
const express = require('express');
const app = express();
const router = express.Router();

//invocando o modulo body-parser que permite trabalhar com dados via POST
const bodyParser = require('body-parser');

//config body-parser
router.use(bodyParser.json()); //suporta os dados dos bodies do json
router.use(bodyParser.urlencoded({extended: true})); //suporta bodies encoded


var mysql = require('mysql');

//Conexão com o banco
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'bcd127',
		database : 'db_popsodadrink'
	});
	connection.connect();
	next();
});

//rotas
const index = require('./routes/index');
const route = require('./router');

//config endpoints
//nesses endpoints não são necessários parametros,
//esses devem estar no file de routes
app.use('/', index);
app.use('/promo/', route);

module.exports = app;

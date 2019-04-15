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
	//set mysql.createConnection({multipleStatements: true});
	global.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'bcd127',
		database : 'db_popsodadrink',
		multipleStatements: true
	});
	connection.connect();
	next();
});

//rotas
const routes = require('./router');

//config endpoints
app.use('/', routes);


module.exports = app;

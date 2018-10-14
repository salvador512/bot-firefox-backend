'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var config = require('./config')
var port = process.env.PORT;
var db = 'mongodb://heroku_w0d1h20w:29ja31qteobu9o79qtengkv3ue@ds131753.mlab.com:31753/heroku_w0d1h20w';

mongoose.Promise = global.Promise;
mongoose.connect(db)
	.then(function() {
		console.log("conexion a la base de datos exitosa");

		//start server
		app.listen(port, function() {
			console.log("Servidor Iniciado");
		})
	})
	.catch(function(err) {
		console.log(err);
	});



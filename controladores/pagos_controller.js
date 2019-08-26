'use strict';

//var persona = require('../models/persona');
var models = require('../models');
const uuidv4 = require('uuid/v4');
var https = require('https');
var querystring = require('querystring');

var Persona = models.persona;

//variables para efectuar el pago
var checkout;
var jsonRes = '';

class pagos_controller {
  
  verPago(req, res) {
    // 1. Prepare the checkout
    function request(callback) {
      var path = '/v1/checkouts';
      var data = querystring.stringify({
        'authentication.userId': '8a8294175d602369015d73bf00e5180c',
        'authentication.password': 'dMq5MaTD5r',
        'authentication.entityId': '8a8294175d602369015d73bf009f1808',
        'amount': '100',
        'currency': 'USD',
        'paymentType': 'DB'
      });
      var options = {
        port: 443,
        host: 'test.oppwa.com',
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': data.length
        }
      };
      var postRequest = https.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          jsonRes = JSON.parse(chunk);
          return callback(jsonRes);
        });
      });
      postRequest.write(data);
      postRequest.end();
    }
    request(function (responseData) {
      console.log(responseData);
      checkout = responseData.id;
      //renderizar a la vista
      Persona.findOne({ where: { external_id: req.user.id } }).then(function (persona) {
        res.render('index', {
          title: 'Pagos',
          sesion: req.user,
          usuario: persona,
          fragmento: 'Fragmentos/Persona/pagos',
          info: req.flash('info'),
          Checkout: checkout,
          precio: '50'
        });

      });
      // finguardar reserva 
    });

  }

  resultadoPago(req, res) {
    function requests(callback) {
      var path = '/v1/checkouts/' + checkout + '/payment';
      path += '?authentication.userId=8a8294175d602369015d73bf00e5180c';
      path += '&authentication.password=dMq5MaTD5r';
      path += '&authentication.entityId=8a8294175d602369015d73bf009f1808';
      var options = {
        port: 443,
        host: 'test.oppwa.com',
        path: path,
        method: 'GET'
      };
      var postRequest = https.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          jsonRes = JSON.parse(chunk);
          return callback(jsonRes);
        });
      });
      postRequest.end();
    }

    requests(function (responseData) {
      console.log(responseData);
      res.render('index', {
        title: 'Status',
        sesion: req.user,
        fragmento: 'Fragmentos/Persona/pagos',
        info: req.flash('info'),
        Checkout: checkout,
        precio: '50'
      });
    });
  }
}

module.exports = pagos_controller;
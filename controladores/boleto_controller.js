'use strict';
//variables de modelos
var models = require('../models');
var cantidadV = '';
//fin de variables de modelos
class boleto_controller {

  tipoBoletos(req, res) {
    res.render('index', {
      title: 'Tipos de boletos', fragmento: 'Fragmentos/Sala/tipoBoletos',
      sesion: req.user,
      info: req.flash('info')
    });
  }

  eleccionBoletos(req,res){
    var precio = req.param.precioTotal;
    var cantB = req.param.cantidadBoletos;
    res.render('index', {
      title: 'Tipos de boletos', fragmento: 'Fragmentos/Sala/eleccionBoletos',
      sesion: req.user,
      precio: precio,
      boletos: canB,
      info: req.flash('info')
    });
  }

}

module.exports = boleto_controller;

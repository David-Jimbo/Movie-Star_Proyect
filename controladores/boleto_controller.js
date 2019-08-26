'use strict';
//variables de modelos
var models = require('../models');
var cantidadV = '';
//fin de variables de modelos
class boleto_controller {

/**
 * @memberof boleto_controller
 * tipo de boleto - METODO
 * es para que el usuario eliga la cantidad de boletos
 * utilizamos req.user para autenticar que el usuario tiene la cuenta
 */

tipoBoletos(req, res) {
    res.render('index', {
      title: 'Tipos de boletos', fragmento: 'Fragmentos/Sala/tipoBoletos',
      sesion: req.user,
      info: req.flash('info')
    });
  }


/**
 * @memberof boleto_controller
 * eleccionBoletos - Metodo
 * con req.params se busca la ruta de la url para el parametro que se desee
 * en este caso requerimos de precio total y cantidad boletos
 * con sesion, precio, boleto los utilizamos para enviar la informacion
 * total a pagar y la cantidad de boleto
 * a la pantalla de asientos
 */
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

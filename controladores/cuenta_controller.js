'use strict';
//variables de modelos
var models = require('../models');
//fin de variables de modelos

/**
 * @class cuenta_controller
 * metodo para cerrar session
 * /destruye la sesion con req.session.destroy();
 *  redirecciona a pagina principal con  res.redirect("/");
 */


class cuenta_controller {
   
    cerrar(req, res) {
        req.session.destroy(); //destruye la sesion 
        res.redirect("/");  // redirecciona a pagina principal
    }
}

module.exports = cuenta_controller;

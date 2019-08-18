'use strict';
//variables de modelos
var models = require('../models');
//fin de variables de modelos
class cuenta_controller {
   
    //metodo para cerrar session
    cerrar(req, res) {
        req.session.destroy();
        res.redirect("/");
    }
}

module.exports = cuenta_controller;

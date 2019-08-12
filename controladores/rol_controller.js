'use strict';

var persona = require('../models/persona');
var models = require('../models');
function crear_roles(){
    var rol = models.rol;
    rol.findAll().then(function (lista){
        if (lista.length === 0){
            rol.bulkCreate([
                {tipo:'administrador'},
                {tipo:'usuario'}
            ]).then(() => {
                
            }).then (rolU =>{
           
            });

        }
        
    });
}

module.exports = {crear_roles};
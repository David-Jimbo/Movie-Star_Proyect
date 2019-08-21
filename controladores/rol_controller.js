'use strict';

var persona = require('../models/persona');
var models = require('../models');
var uuid = require('uuid');
var bcrypt = require('bcrypt');
var sequelize = require('sequelize');
const saltRounds = 8;
function crear_roles(){
    var rol = models.rol;
    rol.findAll().then(function (lista){
        if (lista.length === 0){
            rol.bulkCreate([
                {tipo:'administrador'},
                {tipo:'usuario'}
            ]).then(() => {
                console.log('11111111111111111111111111111');
                return rol.findOne({where:{tipo:'administrador'}});
            }).then (rolA =>{
                var persona = models.persona;
                var generateHash = function (clave) {
                    return bcrypt.hashSync(clave, bcrypt.genSaltSync(saltRounds), null);
                }
    
                    var datosP = {// se esta guardando en el arreglo datos los names de formulario 
                    cedula: '1102474563',
                    apellidos: 'Admin',
                    nombres: 'admin',
                    fecha_nac: '12/05/1990',
                    edad: '29',
                    external_id: uuid.v4(),
                    id_rol: rolA.id,
                    cuenta:{
                        correo:'admin@gmail.com',
                        clave:generateHash('12345'),
                        external_id: uuid.v4(),
                        estado:'true'
                    }
                };
                persona.create(datosP, {include:[{model: models.cuenta, as:'cuenta'}]});
           
            });

        }
        
    });
}

module.exports = {crear_roles};
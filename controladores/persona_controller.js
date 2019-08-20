'use strict';

//var persona = require('../models/persona');
var models = require('../models');
var uuid = require('uuid');
var bcrypt = require('bcrypt');
var sequelize = require('sequelize');
const saltRounds = 8;

class persona_controller {

    guardar(req, res){
        var persona = models.persona;
        var cuenta = models.cuenta;
        var rol = models.rol;

        cuenta.findAll({where:{correo:req.body.email}}).then(function (result){
            if(result.length >0){
                //res.send('El correo ya existe, ingrese otro');
                req.flash('error','El correo ya existe, ingrese otro');
                res.redirect('/registrarse');
            }else{
                persona.findAll({include: [{model:models.cuenta, as:'cuenta'}], where:{cedula:req.body.cedula}}).then(function (resultC){
                    if(resultC.length > 0){
                       //res.send('La cedula ya existe, ingrese otra');
                       req.flash('error','La cedula ya existe, ingrese otra');
                       res.redirect('/registrarse');
                    }else{
                       rol.findOne({ where: { tipo: 'usuario' } }).then(rolU => {
                           var generateHash = function (clave) {
                               return bcrypt.hashSync(clave, bcrypt.genSaltSync(saltRounds), null);
                           }
               
                               var datosP = {// se esta guardando en el arreglo datos los names de formulario 
                               cedula: req.body.cedula,
                               apellidos: req.body.apellidos,
                               nombres: req.body.nombres,
                               fecha_nac: req.body.fechaNacimiento,
                               edad: req.body.edad,
                               external_id: uuid.v4(),
                               id_rol: rolU.id,
                               cuenta:{
                                   correo:req.body.email,
                                   clave:generateHash(req.body.clave),
                                   external_id: uuid.v4(),
                                   estado:'true'
                               }
                           };
                           persona.create(datosP, {include:[{model: models.cuenta,as:'cuenta'}]}).then(function (resultG) {
                               req.flash('ok', 'se ha guardado');
                               res.redirect('/');
               
                               //res.send(resultG);
                           }).error(function (error) {
                               res.send(error);
                           });
                       }).error(function (error) { });
   
                    }
               }).error(function (error){});
            }
        }).error(function (error){});
            
       
    }

   informacion(req,res){
       var persona = models.persona;
       var cuenta= models.cuenta;
       
       persona.findAll({where:{external_id:req.user.id},include: [{model: models.cuenta, as: 'cuenta'}]}).then(function(lalo){
        if (lalo) {
            res.render('index', {
                title: 'PELICULA', fragmento: 'Fragmentos/Persona/verPerfil', 
                lista:lalo,
                sesion:true,
                
                msg: {
                    error: req.flash('error'),
                    info: req.flash('ok')
                },
                nombre:req.user.nombre,
                apellido:req.user.apellido,
                cedula:req.user.cedula,
                edad:req.user.edad,
                fecha_nac:req.user.fecha_nac,
                correo:req.user.correo,
                
                

            });
            console.log(lalo);
            
        }
       }).error(function (error){});
   }
   

   modificar(req, res){

    var persona = models.persona;
       persona.findOne({where:{external_id:req.user.id},include: [{model: models.cuenta, as: 'cuenta'}]}).then(function (result){
        console.log(result);
        result.nombres= req.body.nombresM,
        result.fecha_nac= req.body.fecha_nacM,
        result.edad= req.body.edadM,
        result.save().then(function (sav){
            res.redirect('/mi_perfil');
        });
       })
   }

    
}

module.exports = persona_controller;
'use strict';

//var persona = require('../models/persona');
var models = require('../models');
const uuidv4 = require('uuid/v4');
var bcrypt = require('bcrypt-nodejs');
var sequelize = require('sequelize');
const saltRounds = 8;

class persona_controller {


/**
 * @memberof persona_controller
 * guardar - METODO
 * requerimos los modelos: cuenta y persona
 * buscamos en cuenta su atributo email
 * para verificar que el correo existe o no
 * en persona junto con cuenta buscaremos cedula
 * para verificar que la cedula existe o no
 */


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
                               external_id: uuidv4(),
                               id_rol: rolU.id,
                               cuenta:{
                                   correo:req.body.email,
                                   clave:generateHash(req.body.clave),
                                   external_id: uuidv4(),
                                   estado:'true'
                               }
                           };
                           persona.create(datosP, {include:[{model: models.cuenta,as:'cuenta'}]}).then(function (resultG) {
                               req.flash('info', ' Su cuenta ha sido guardada correctamente');
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



   /**
    * @memberof persona_controller
    * informacion - Metodo
    * Crearemos una lista para mostrar los datos de la persona
    * modelos requeridos: modelo y cuenta
    * y guardamos los datos
    */
   informacion(req,res){
       var persona = models.persona;
       var cuenta= models.cuenta;
       persona.findAll({where:{external_id:req.user.id},include: [{model: models.cuenta, as: 'cuenta'}]}).then(function(lalo){
        if (lalo) {
            res.render('index', {
                title: 'Mi Perfil', fragmento: 'Fragmentos/Persona/verPerfil', 
                lista:lalo,
                sesion: req.user,
                error2: req.flash('error'),
                info2: req.flash('info') ,
                
                nombre:req.user.nombre,
                apellido:req.user.apellido,
                cedula:req.user.cedula,
                edad:req.user.edad,
                fecha_nac:req.user.fecha_nac,
                correo:req.user.correo
            });
        }
       }).error(function (error){});
   }
   
/**

 * @memberof persona_controller
 *modificar - Metodo
* repetimos el proceso como en pelicula
para modificar los datos de persona
 */
modificar(req, res){
    var persona = models.persona;
       persona.findOne({where:{external_id:req.user.id},include: [{model: models.cuenta, as: 'cuenta'}]}).then(function (result){
        console.log(result);
        result.nombres= req.body.nombresM,
        result.fecha_nac= req.body.fecha_nacM,
        result.edad= req.body.edadM,
        result.save().then(function (sav){
            req.flash('info', '  ha editado su cuenta correctamente');
             res.redirect('/mi_perfil');
        });
       })
   }
}

module.exports = persona_controller;
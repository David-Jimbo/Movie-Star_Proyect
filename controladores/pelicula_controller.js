'use strict';

//var persona = require('../models/persona');
var models = require('../models');
var uuid = require('uuid');


var Pelicula = models.pelicula;
class pelicula_controller {

    listar_peli(req, res) {
       
        Pelicula.findAll({where:{estado:true}}).then(function (pelicula) {
            if (pelicula) {
                res.render('index', {
                    title: 'PELICULA', fragmento: 'Fragmentos/Peliculas/verTodas', 
                    lista:pelicula,
                    sesion: req.user,
                    msg: {
                        error: req.flash('error'),
                        info: req.flash('ok')
                    }
                });
                console.log(pelicula);
            }
        }).error(function (error) {
            res.send(error);
        });
    }

    guardar_pelicula(req, res){
        Pelicula.findAll({ where: { nombre_peli: req.body.nombre_peli } }).then(function (resultado){
            if(resultado.length >0){
                //res.send('El correo ya existe, ingrese otro');
                req.flash('error','hey chaval...la pelicula ya existe, ingrese otro');
                res.redirect('/admin/peliculas/nueva');
            }else{
                var peli = {
                    nombre_peli: req.body.nombre_peli,
                        genero: req.body.genero,
                        fecha_lanzamiento: req.body.fecha,
                        sinopsis: req.body.sinopsis,
                        clasificacion: req.body.clasificacion,
                        duracion: req.body.duracion,
                        director: req.body.director,
                        protagonistas: req.body.protagonistas,
                        estado: req.body.proyeccion,
                        external_id: uuid.v4()
                };

                Pelicula.create(peli).then(function (resul){
                    req.flash('info','Se ha guardado la pelocula correctamente');
                    res.redirect('/peliculas'); 
                }).error(function (error){
                    res.send(error);
                });
            }   
        });
    }
}

module.exports = pelicula_controller;
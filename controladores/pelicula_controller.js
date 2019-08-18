'use strict';

//var persona = require('../models/persona');
var models = require('../models');
var uuid = require('uuid');


var Pelicula = models.pelicula;
class pelicula_controller {

   /* listar_peli(req, res) {

        Pelicula.findAll({}).then(function (pelicula) {
            if (pelicula) {
                res.render('index', {
                    title: 'PELICULA', fragmento: 'fragmentos/registrarP', listape: pelicula,
                    msg: {
                        error: req.flash('error'),
                        ok: req.flash('ok')
                    }

                });
            }
        }).error(function (error) {
            res.send(error);
        });

    }*/

    guardar_p(req, res) {
        if (req.body.external === "0") {
            Pelicula.findAll({ where: { nombre_peli: req.body.nombre_peli } }).then(function (pelicula) {
                if (pelicula) {
                    req.flash('error', 'La pelicula ya ha sido registrada');
                    res.redirect('/admin/peliculas/nueva');
                } else {
                    Pelicula.create({
                        nombre_peli: req.body.nombre_peli,
                        genero: DataTypes.req.body.genero,
                        fecha_lanzamiento: req.body.fecha,
                        sinopsis: req.body.sinopsis,
                        clasificacion: req.body.clasificacion,
                        duracion: req.body.duracion,
                        director: req.body.director,
                        protagonistas: req.body.protagonistas,
                        external_id: uuid.v4()
                    }).then(function (newPelicula, created) {
                        if (newPelicula) {
                            //req.flash('ok', 'se ha guardado la pelicula');
                            //res.redirect('/peliculas');
                            res.send(newPelicula);

                        }
                    }).error(function (error) {
                        res.send(error);
                    });
                }

            }).catch(function (err) {
                req.flash('error', 'Hubo un problema');
                res.redirect('/peliculas');
            });
        } else {
            Pelicula.update({
                        nombre_peli: req.body.nombre_peli,
                        genero: DataTypes.req.body.genero,
                        fecha_lanzamiento: req.body.fecha,
                        sinopsis: req.body.sinopsis,
                        clasificacion: req.body.clasificacion,
                        duracion: req.body.duracion,
                        director: req.body.director,
                        protagonistas: req.body.protagonistas,

            }, { where: { external_id: req.body.external } }).then(function (updatePelicula, created) {
                if (updatePelicula) {
                    req.flash('ok', 'se ha modificado la pelicula');
                    res.redirect('/peliculas');
                }
            }).error(function (error) {
                res.send(error);
            });
        }

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
                        external_id: uuid.v4()
                };

                Pelicula.create(peli).then(function (resul){
                    req.flash('info', 'se ha guardado');
                    res.redirect('/peliculas'); 
                }).error(function (error){
                    res.send(error);
                });
            }   

        });
    }

    
}

module.exports = pelicula_controller;
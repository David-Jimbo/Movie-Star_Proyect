'use strict';

//var persona = require('../models/persona');
var models = require('../models');
var uuid = require('uuid');
//var bcrypt = require('bcrypt');
//var sequelize = require('sequelize');
const saltRounds = 8;

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
            Pelicula.findOne({ where: { nombre_peli: req.body.nombre_peli } }).then(function (pelicula) {
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
                        external_id: uuidv4()
                    }).then(function (newPelicula, created) {
                        if (newPelicula) {
                            req.flash('ok', 'se ha guardado la pelicula');
                            res.redirect('/peliculas');
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
}

module.exports = pelicula_controller;
'use strict';

var models = require('../models');
var Pelicula = models.pelicula;
//var Sala = models.Sala;

class horario_controller {

    listar_horarios(req, res) {
        Pelicula.findAll({ where: { estado: true } }).then(function (pelicula) {
            if (pelicula) {
                res.render('index', {
                    title: 'horarios', fragmento: 'Fragmentos/Horarios/horarios',
                    lista: pelicula,
                    sesion: req.user
                });
                console.log(pelicula);
            }
        }).error(function (error) {
            res.send(error);
        });
    }
}

module.exports = horario_controller;


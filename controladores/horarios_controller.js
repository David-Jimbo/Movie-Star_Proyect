'use strict';

var models = require('../models');
var Pelicula = models.pelicula;
var Sala = models.sala;
var Horario = models.horario;
var uuid = require('uuid');
//var Sala = models.Sala;

class horario_controller {

    listar_horarios(req, res) {
        Pelicula.findAll({ where: { estado: true } }).then(function (pelicula) {
            if (pelicula) {
                Sala.findAll().then(function (salas) {
                    res.render('index', {
                        title: 'horarios', fragmento: 'Fragmentos/Horarios/horarios',
                        listaPelis: pelicula,
                        salas: salas,
                        sesion: req.user
                    });
                }).error(function () {
                })
                //console.log(pelicula);
            }
        }).error(function (error) {
            res.send(error);
        });
    }

    nueva_sala(req, res) {
        var salaD = {
            nombre_sala: 'Sala 2',
            nro_asientos: '90',
            external_id: uuid.v4()
        }
        Sala.create(salaD).then(function () {
            req.flash('info', ' Se ha guardado correctamente');
            res.redirect('/');
        }).error(function () {

        })
    }
    nuevo_horario(req, res) {
        var hor = {
            fecha_inicio: '2019-08-23 18:00:00',
            fecha_fin: '2019-08-23 20:30:00',
            external_id: uuid.v4(),
            id_pelicula: '3',
            id_sala: '4'
        }
        Horario.create(hor).then(function () {
            req.flash('info', ' El horario se ha guardado correctamente');
            res.redirect('/');
        }).error(function () {

        })
    }

   cargarHorarios(req, res) {
        Horario.findAll({ include: [{ model: models.pelicula }, { model: models.sala }] }).then(function (lista) {
            //console.log(lista)
            //res.send(lista)
            var listaRefinada = [];
            if (lista.length > 0) {
                for (var i = 0; i < lista.length; i++) {
                    listaRefinada.push({
                        'title': lista[i].pelicula.nombre_peli,
                        'start': lista[i].fecha_inicio,
                        'end': lista[i].fecha_fin
                    })
                }
                //res.send(listaRefinada)
                //console.log(listaRefinada)
                res.json(listaRefinada);
            }
        }).error(function () {

        })
    }

}

module.exports = horario_controller;


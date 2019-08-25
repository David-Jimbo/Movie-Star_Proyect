'use strict';

var models = require('../models');
var Pelicula = models.pelicula;
var Sala = models.sala;
const uuidv4 = require('uuid/v4');

var uuid = require('uuid');
//var Sala = models.Sala;

class proyeccion_controller {

    listar(req, res) {

        Sala.findAll().then(function (sala) {

            Pelicula.findAll().then(function (pelicula) {

                res.render('index', {
                    title: 'horarios', fragmento: 'Fragmentos/Proyeccion/proyeccion',
                    listaPelis: pelicula,
                    sesion: req.user,
                    listas: sala,
                    listap: pelicula


                })


            }).error(function (error) { });

            console.log('------------------------' + sala)
        }).error(function (error) { });



    }
     
    guardar(req, res){
        var Proyeccion = models.proyeccion;
        console.log('error', 'hey chaval...la pelicula ya existe, ingrese otro')
        
                Sala.findOne({ where: { external_id: req.body.sala } }).then( function(sala)  {
                    console.log(sala)
                    Pelicula.findOne({ where: { external_id: req.body.peliculas } }).then(function (pelicula) {
                        console.log(pelicula)
                        var datosPr = {
                            hora_inicio: req.body.inicio,
                            hora_fin: req.body.fin,
                            fecha: req.body.fecha,
                            external_id: uuidv4(),
                            id_sala: sala.id,
                            id_pelicula: pelicula.id


                        }
                        Proyeccion.create(datosPr).then(function (resultG) {
                            req.flash('info', ' Su cuenta ha sido guardada correctamente');
                            res.redirect('/proyeccion');
                            //res.send(resultG);
                        }).error(function (error) {
                            res.send(error);
                        });
                    }).error(function(error){})

                }).error(function(error){});
            

        
    }
    
    

    
}

module.exports = proyeccion_controller;

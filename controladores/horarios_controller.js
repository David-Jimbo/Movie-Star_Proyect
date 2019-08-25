'use strict';

var models = require('../models');
var Pelicula = models.pelicula;
var Sala = models.sala;
var Horario = models.horario;
const uuidv4 = require('uuid/v4');
//var Sala = models.Sala;

class horario_controller {

    listar_horarios(req, res) {
        Pelicula.findAll().then(function (pelicula) {
            if (pelicula) {
                    res.render('index', {
                        title: 'horarios', fragmento: 'Fragmentos/Horarios/lista',
                        listaPelis: pelicula,
                        
                        sesion: req.user
                    });
                
                //console.log(pelicula);
            }
        }).error(function (error) {
            res.send(error);
        });
    }

   
    nuevo_horario(req, res) {
       Sala.findOne({ where: { external_id: req.body.external } }).then( function(sala)  {
        Pelicula.findOne({ where: { external_id: req.body.peliculaM } }).then( function(peli)  {
            var datosH = {
                hora: req.body.inicioM,
                fecha: req.body.fecha,
                external_id: uuidv4(),
                id_sala: sala.id,
                id_pelicula: peli.id
    
    
            }
            Horario.create(datosH).then(function (resultG) {
                req.flash('info', ' SLos horarios se han guardado correctamente');
                res.redirect('/horarios');
                //res.send(resultG);
            }).error(function (error) {
                res.redirect('/');
                res.send(error);
            });
        }).error(function (error){});

       
       }).error(function (error){});
    }

   cargarHorarios(req, res) {
       /* Sala.findAll({include: [{model: models.horario, as: 'sala-horario'}]}).then(function (lista) {
            res.render('index', {
                title: 'horarios', fragmento: 'Fragmentos/Horarios/listar',
                lista: lista,
                sesion: req.user
            });
            console.log(lista)
        }).error(function () {

        })
    }*/

    Horario.findAll({include: [{model: models.sala},{model:models.pelicula}]}).then(function (lista) {
        res.render('index', {
            title: 'horarios', fragmento: 'Fragmentos/Horarios/listar',
            lista: lista,
            sesion: req.user
        });
        console.log(lista)
    }).error(function () {

    })

    
}
ver_Pelicula(req,res){
    Pelicula.findAll().then(function (pelicula) {

        res.render('index', {
            title: 'horarios', fragmento: 'Fragmentos/Horarios/peliculaHorario',
            
            sesion: req.user,
            listap: pelicula,
            error: req.flash('error'), 
            info: req.flash('info')


        })


    }).error(function (error) { });
    
}
Agregar_pelicula(req, res){
    Pelicula.findOne({ where: { external_id: req.body.peliculas } }).then(function (pelicula) {}).error(function(error){});
}

}

module.exports = horario_controller;


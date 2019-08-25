'use strict';

//var persona = require('../models/persona');
var models = require('../models');
var Sala = models.sala;
var Pelicula = models.pelicula;
const uuidv4 = require('uuid/v4');
class sala_controller {


  lista_Sala(req,res){
    Sala.findAll().then(function (sala) {

      Pelicula.findAll().then(function (pelicula) {

          res.render('index', {
              title: 'horarios', fragmento: 'Fragmentos/Sala/listaSala',
              sesion: req.user,
              listas: sala,
              listap: pelicula,
              error: req.flash('error'), 
              info: req.flash('info')


          })


      }).error(function (error) { });

      console.log('------------------------' + sala)
  }).error(function (error) { });
  }
guardars(req,res){
    Sala.findAll({where:{nombre_sala:req.body.nsala}}).then(function(result){
  if(result > 0){
    req.flash('error','El nombre de sala ya existe, ingrese otro');
    res.redirect('/agregar_sala');
  }else{
      var datosS={
          nombre_sala:req.body.nsala,
          nro_asientos: req.body.asientos,
    external_id:uuidv4()
      };
      Sala.create(datosS).then(function(save){
        req.flash('info','Se ha guardado la sala correctamente');
        res.redirect('/peliculas');
      }).error(function(error){
        res.send(error);
        Estreno
      });sala
  }
    }).error(function(error){
        res.send(error);

    });
}
}

module.exports= sala_controller;
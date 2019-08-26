'use strict';

var models = require('../models');
var Pelicula = models.pelicula;
var Sala = models.sala;
var Horario = models.horario;
const uuidv4 = require('uuid/v4');
//var Sala = models.Sala;

/**
 * @class horario_controller
 * buscamos dentro del modelo pelicula y creamos una funcion llamada pelicula
 * creamos una lista 
 * el req.user para el usuario autenticado
 */

class horario_controller {

    listar_horarios(req, res) {
        Pelicula.findAll().then(function (pelicula) {  
            if (pelicula) {                      
                    res.render('index', {
                        title: 'horarios', fragmento: 'Fragmentos/Horarios/lista',
                        listaPelis: pelicula,  //creamos una lista 
                        
                        sesion: req.user  
                    });
                
                //console.log(pelicula);
            }
        }).error(function (error) {
            res.send(error);
        });
    }

   /**
    * @param {*} req -solictud http
    * @param {*} res -respuesta http
    * @memberof horario_controller
    * Nuevo Horario - Metodo
    * buscamos en el modelo sala un solo elemento que va ser el external de sala con su funcion correspondiente
       buscamos en el modelo pelicula un solo elemento que va ser el external de sala con su funcion correspondiente
       guardamos en nuestro arreglo datosH los datos que va a tener esta vista excepto sus ids que seran ocultos
    */

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
                req.flash('info', ' Los horarios se han guardado correctamente');   
                res.redirect('/horarios');
                //res.send(resultG);
            }).error(function (error) {
                res.redirect('/');
                res.send(error);
            });
        }).error(function (error){});

       
       }).error(function (error){});
    }


/**
 * @param {*} req -solicitud http
 * @param {*} res - respuesta http
 * @memberof horario_controller
 * Cargar horarios - metodo
 * 
 * para crear horario vamos a buscar dentro del modelo de sala y pelicula 
        con nuestra funcion llamada lista la utilizaremos en su respectiva vista
 */

cargarHorarios(req, res) {
       

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

/**
 * @param {*} req
 * @param {*} res
 * @memberof horario_controller
 * ver_pelicula - metodo
 * se busca en pelicula luego se crea una funcion
 * que sera utilizada para listarla luego 
 */

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
    
/**
 * @param {*} req
 * @param {*} res
 * @memberof horario_controller
 * Agrega_pelicula - metodo
 * En el modelo Pelicula buscamos donde esta su external corresponidente
 */
Agregar_pelicula(req, res){
    Pelicula.findOne({ where: { external_id: req.body.peliculas } }).then(function (pelicula) {}).error(function(error){});
}


}

module.exports = horario_controller;


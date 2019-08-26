'use strict';
var models = require('../models');
var Pelicula = models.pelicula;
var Rol = require('../controladores/rol_controller');
/**
 *
 *
 * @class principal_controller
 * listar_peliculas - METODO
 * pelicula (modelo) buscamos su estado si es verdadero
 * se crea el rol
 * y se muestra la pelicula en lista
 * 
 */
class principal_controller {
    listar_peliculas(req, res) {
        Pelicula.findAll({ where: { estado: true } }).then(function (pelicula) {
            if (pelicula) {
                Rol.crear_roles();
                res.render('index', {
                    title: 'Movie Star', 
                    fragmento: 'Fragmentos/principal',
                    lista: pelicula,
                    sesion: req.user, 
                    error: req.flash('error'), 
                    info: req.flash('info')
                });
                console.log(pelicula);
            }
        }).error(function (error) {
            res.send(error);
        });
    }
}

module.exports = principal_controller;
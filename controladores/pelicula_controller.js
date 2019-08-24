'use strict';

//var persona = require('../models/persona');
var models = require('../models');
const uuidv4 = require('uuid/v4');
var root = require('app-root-path');
//para subir imagen
var fs = require('fs');
var maxFileSize = 1 * 1024 * 1024;
var extensiones = ["jpg", "png", "jpeg"];
var formidable = require('formidable');

var Pelicula = models.pelicula;
class pelicula_controller {

    listar_peli(req, res) {      
        Pelicula.findAll({}).then(function (pelicula) {
            if (pelicula) {
               // res.send(pelicula);
               
              res.render('index', {
                    title: 'PELICULA', fragmento: 'Fragmentos/Peliculas/verTodas', 
                    lista:pelicula,
                    sesion: req.user,
                    
                    
                });
                console.log(pelicula);
            }
        }).error(function (error) {
            res.send(error);
        });
    }

    tabla_peli(req, res) {      
        Pelicula.findAll({}).then(function (pelicula) {
            if (pelicula) {
               // res.send(pelicula);
               
              res.render('index', {
                    title: 'PELICULA', fragmento: 'Fragmentos/Peliculas/listaPeliculas', 
                    lista:pelicula,
                    sesion: req.user,
                    
                    
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
                res.redirect('/peliculas/nueva');
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
                        portada:"sin portada",
                        external_id: uuidv4()
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
    guardarPortada(req, res, next) {
       
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
           
            if (files.foto.size <= maxFileSize) {
               
                var extension = files.foto.name.split(".").pop().toLowerCase();
                if (extensiones.includes(extension)) {
                    var oldpath = files.foto.path;
                  
                    var nombre = fields.external + "." + extension;
                    console.log(files.foto.path);
                    fs.readFile(oldpath, function (err, data) {
                        // Write the file
                        fs.writeFile((root + "/public/imagenes/" + nombre), data, function (error) {
                            if (error)
                                throw err;
                            console.log('File written!');
                            Pelicula.update({
                                portada: nombre
                            }, {where: {external_id: fields.external}}).then(function (updatedPelicula, created) {
                                if (updatedPelicula) {
                                    req.flash('info', 'se subio correctamente chaval', false);
                                    res.redirect('/peliculas');
                                    console.log(nombre + "----------------------");
                                }

                            });
                        });
                        // Delete the file
                        fs.unlink(oldpath, function (err) {
                            if (err)
                                throw err;
                            console.log('File deleted!');
                        });
                    });
                } else {
                    pelicula_controller.eliminar(files.archivo.path);
                    console.log('Error de extencion');
                    req.flash('error', 'Error de extencion', false);
                    res.redirect('/' + fields.external);
                }
            } else {
                pelicula_controller.eliminar(files.archivo.path);
                console.log('Error de tamaño se admite');
                req.flash('error', 'Error de tamaño se admite', +maxFileSize, false);
                res.redirect('/' + fields.external);
            }
        });
    }
    static eliminar(link) {
        fs.exists(link, function (exists) {
            if (exists) {
                console.log('files exists, deleting now ....' + link);
                fs.unlinkSync(link);
            } else {
                console.log('no se borro' + link);
            }
        });
    }
}

module.exports = pelicula_controller;
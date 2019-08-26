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
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @memberof pelicula_controller
 * listar _peli - metodo
 * requerimos de horario (modelo)
 * buscamos en el modelo horario incluido el modelo de pelicula
 * para luego la funcion de listar
 * utilizarla en la vista correspondiente
 */


listar_peli(req, res) { 
        var Horario = models.horario;     
        Horario.findAll({include: [{model:models.pelicula}]}).then(function (lista) {
            res.render('index', {
                title: 'horarios', fragmento: 'Fragmentos/Peliculas/verTodas',
                lista: lista,
                sesion: req.user
            });
            console.log(lista)
        }).error(function () {
    
        })
    }
/**
 * @memberof pelicula_controller
 * tabla_peli - metodo
 * para crear una tabla 
 * buscaremos en el modleo de pelicula
 * creamos una variable para el nombre de la lista
 */
tabla_peli(req, res) {      
        Pelicula.findAll({}).then(function (pelicula) {
            if (pelicula) {
               // res.send(pelicula);
               
              res.render('index', {
                    title: 'PELICULA', fragmento: 'Fragmentos/Peliculas/listaPeliculas', 
                    lista:pelicula,
                    sesion: req.user,
                    
                    
                    info: req.flash('info'),
                    sesion: req.user
                });
               // console.log(pelicula);
            }
        }).error(function (error) {
            res.send(error);
        });
    }
/**
 * @memberof pelicula_controller
 * guardar_peli - metodo
 * en el modelo de pelicula buscaremos el parametro de nombre de la pelicula
 * haciendo una condicion para que no se pueda registrar la pelicula
 * si esta repetido
 * 
 */
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
                        trailer:req.body.trailer,
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


    /**
     * @memberof pelicula_controller
     * guardar_portada - Metodo
     * utilizaremos la libreria de formidable
     * para controlar el tamano de la imagen
     * sus dimensiones y sus tipos de extensiones 
     * utilizaremos path para la ruta de la imagen
     * y los procesos de 
     * redfile : leer el archivo
     * writefile: escribir el archivo hasta que se suba
     */
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
                                    res.redirect('/peliculas/lista');
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


    /**
     * @memberof pelicula_controller
     * Modificar_pelicula
     * buscaremos en pelicula (modelo) su external
     * con la funcion result
     * funcionara como una lista 
     * primero requerimos los nombres del modelo
     * segundo los names que corresponden al nombre del modelo
     * asi se vera el cambio anterior y el nuevo 
     */
    modificar_pelicula(req, res){
        Pelicula.findOne({where:{external_id:req.body.externalP}}).then(function (result){
            
        result.nombre_peli= req.body.nombre_peli_M,
        result.genero=req.body.generoM,
        result.director=req.body.directorM,
        result.fecha_lanzamiento=req.body.fechaM,
        result.protagonistas=req.body.protagonistasM,
        result.clasificacion=req.body.clasificacionM,
        result.estado=req.body.proyeccionM,
        result.duracion=req.body.duracionM,
        result.sinopsis=req.body.sinopsisM,
        result.save().then(function (sav){
            req.flash('info', '  ha editado las peliculas correctamente');
             res.redirect('/peliculas/lista');
        });
        }).error(function (error){});
    }
}

module.exports = pelicula_controller;
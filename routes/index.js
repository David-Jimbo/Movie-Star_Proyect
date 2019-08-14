var express = require('express');
var router = express.Router();

var Rol = require('../controladores/rol_controller');

//persona controller

var personaC = require('../controladores/persona_controller');
var persona = new personaC();

/* GET home page. */
router.get('/', function(req, res, next) {
  Rol.crear_roles();
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/principal', msg: { error: req.flash('error'), ok: req.flash('info')} });
});

router.get('/registrarse', function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/registrar' });
});

router.get('/mi_perfil', function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/verPerfil' });
});

router.get('/editar_perfil', function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/editarPerfil' });
});

router.get('/peliculas', function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Peliculas/verTodas' });
});

router.get('/peliculas/nueva', function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Peliculas/registrarP' });
});


router.get('/test', function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/verPerfil' });
});


router.post('/guardar_persona', persona.guardar);
module.exports = router;

var express = require('express');
var router = express.Router();

var Rol = require('../controladores/rol_controller');

//persona controller

var personaC = require('../controladores/persona_controller');
var persona = new personaC();

/* GET home page. */
router.get('/', function(req, res, next) {
  Rol.crear_roles();
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/principal'});
});

router.get('/registrarse', function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/registrar' });
});

router.get('/test', function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/test' });
});


router.post('/guardar_persona', persona.guardar);
module.exports = router;

var express = require('express');
var router = express.Router();
var passport = require('passport');

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

////////inicio sesion


router.get('/rol', function(req, res){
  if(req.user.rol === 'administrador'){
    res.redirect('/registrarse');
  }else if(req.user.rol === 'usuario'){
    res.redirect('/test');
  }
});
router.post('/inicio_sesion', 
        passport.authenticate('local-signin',
              {successRedirect:'/rol',
              failureRedirect:'/',
               failureFlash: true}

        ));




router.post('/guardar_persona', persona.guardar);
module.exports = router;

var express = require('express');
var router = express.Router();
var passport = require('passport');

var Rol = require('../controladores/rol_controller');

//persona controller

var personaC = require('../controladores/persona_controller');
var persona = new personaC();

//cuenta controller
var cuentaC = require('../controladores/cuenta_controller');
var cuenta = new cuentaC()




///////
var auth = function middleWare(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      req.flash("error", "Inicia sesion !!!");
      res.redirect('/');
  }
};


var admin = function middleWare(req, res, next) {
  if (req.user.rol === 'administrador') {
      next();
  } else {
      req.flash('error', 'No tienes permiso para ingresar a esta direccion!!');
      res.redirect('/');
  }
};

router.get('/cerrar_sesion', cuenta.cerrar);




//svar admin = function(req, res, next){
//if(req.user. rol === 'administrador'){
  //   next();
//}else {
  //req.flash('error', 'No tienes permiso para ingresar a esta direccion!');
  //    res.redirect('/');
//}
//};

//router.get('/rol', function(req, res){
  //if(req.user.rol === 'administrador'){
//
  //res.redirect('/peliculas');
  //}else if(req.user.rol === 'usuario'){
    //res.redirect('/registrarse');
 //}
//});
router.post('/inicio_sesion', 
        passport.authenticate('local-signin',
              {successRedirect:'/rol',
              failureRedirect:'/',
               failureFlash: true},
               

        ));


        router.get('/rol', function (req, res){
          if (req.user.rol === 'administrador'){
            res.redirect('/admin/peliculas');
          }else if(req.user.rol === 'usuario'){
            res.redirect('/test');
          }
        });
///////

/* GET home page. */
router.get('/', function(req, res, next) {
  Rol.crear_roles();
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/principal', msg: { error: req.flash('error'), ok: req.flash('info')} });
});

router.get('/registrarse', function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/registrar', msg: { error: req.flash('error'), ok: req.flash('info')} });
});

router.get('/mi_perfil', function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/verPerfil' });
});

router.get('/editar_perfil', function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/editarPerfil' });
});

router.get('/admin/peliculas', auth,admin,function (req, res, next) {
  res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Peliculas/verTodas', sesion:true });
});



router.get('/admin/peliculas/nueva',  auth, admin,function (req, res, next) {
    res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Peliculas/registrarP' ,sesion:true});
   
 
});


router.get('/test', function (req, res, next) {
res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/verPerfil', sesion:true, usuario:req.user.nombre});
});




////////inicio sesion


//peli
router.post('/guardar_peli', Pelicula.guardar_p);




router.post('/guardar_persona', persona.guardar);
module.exports = router;

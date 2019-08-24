var express = require('express');
var router = express.Router();
var passport = require('passport');

var Rol = require('../controladores/rol_controller');

//persona controller
var principalC = require('../controladores/principal_controller');
var principal = new principalC();

//persona controller
var personaC = require('../controladores/persona_controller');
var persona = new personaC();

//cuenta controller
var cuentaC = require('../controladores/cuenta_controller');
var cuenta = new cuentaC()

//pelicula controller
var pelicula = require('../controladores/pelicula_controller');
var Pelicula = new pelicula();

//horarios controller
var horario = require('../controladores/horarios_controller');
var horarioC = new horario();

//controla si las personas estan iniciadas sesion
var auth = function middleWare(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("error", "Inicia sesion !!!");
        res.redirect('/');
    }
};

//verifica si el rol corresponde con la vista
var admin = function middleWare(req, res, next) {
    if (req.user.rol === 'administrador') {
        next();
    } else {
        req.flash("error", 'No tienes permiso para ingresar a esta direccion!!');
        res.redirect('/');
    }
};

router.get('/rol', function (req, res) {
    if (req.user.rol === 'administrador') {
        res.redirect('/peliculas');
    } else if (req.user.rol === 'usuario') {
        res.redirect('/mi_perfil');
    }
});

//controla el inicio de sesion
router.post('/inicio_sesion', passport.authenticate('local-signin', {
    successRedirect: '/rol',
    failureRedirect: '/',
    failureFlash: true
}));
router.get('/cerrar_sesion', cuenta.cerrar);


/* GET Pagina principal. */
router.get('/', principal.listar_peliculas);

//para registrar usuarios
router.get('/registrarse', function (req, res, next) {
    res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/registrar', error2: req.flash('error') });
});
router.post('/guardar_persona', persona.guardar);

//Para  verificar perfil y editar
router.get('/mi_perfil', auth, persona.informacion);
router.post('/mi_perfil/modificar', auth, persona.modificar);

//--------------Peliculas-------------
router.get('/peliculas', Pelicula.listar_peli);
router.post('/guardar/portada', Pelicula.guardarPortada);
router.get('/peliculas/nueva', auth, admin, function (req, res, next) {
    res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Peliculas/registrarP', sesion: req.user, error2: req.flash('error')});
});
router.post('/guardar_peli', Pelicula.guardar_pelicula);
router.get('/verPelicula', function (req, res, next) {
    res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Peliculas/verPelicula', sesion: req.user, rol: req.user.rol });
});
router.get('/peliculas/lista', auth, admin, Pelicula.tabla_peli);
router.get('/editarPelicula', auth, admin,function (req, res, next) {
    res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Peliculas/editarPelicula' });
});


//gestion de horarios
router.get('/gestionHorarios', horarioC.listar_horarios)

//---------pruebas---------------
router.get('/test', function (req, res, next) {
    res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/test', sesion: req.user });
});

module.exports = router;

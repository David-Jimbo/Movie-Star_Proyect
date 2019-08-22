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

//pelicula controller
var pelicula = require('../controladores/pelicula_controller');
var Pelicula = new pelicula();

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
        req.flash('error', 'No tienes permiso para ingresar a esta direccion!!');
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
router.get('/', function (req, res, next) {
    Rol.crear_roles();
    res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/principal', sesion: req.user, error: req.flash('error'), info: req.flash('info') });
    console.log("la variable de sesion es: ");
    console.log(req.user)
});

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
router.get('/admin/peliculas/nueva', auth, admin, function (req, res, next) {
    res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Peliculas/registrarP', sesion: req.user, error2: req.flash('error')});
});
router.post('/guardar_peli', Pelicula.guardar_pelicula);
router.get('/verPelicula', function (req, res, next) {
    res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Peliculas/verPelicula', sesion: req.user, rol: req.user.rol });
});
router.get('/editarPelicula', function (req, res, next) {
    res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Peliculas/editarPelicula' });
});


//---------pruebas---------------
router.get('/test', function (req, res, next) {
    res.render('index', { title: 'Movie Star', fragmento: 'Fragmentos/Persona/verPerfil', sesion: req.user, usuario: req.user.nombre });
});

module.exports = router;

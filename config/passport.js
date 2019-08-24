var bcrypt = require('bcrypt-nodejs'); //modulo para encriptar claves
var models = require('./../models');
var cuenta = models.cuenta;
var persona = models.persona;
var rol = models.rol;
module.exports = function (passport) {
    var Cuenta = cuenta;//modelo
    var Persona = persona;//modelo   
    var Rol = rol; 
    var LocalStrategy = require('passport-local').Strategy;
    //Permite serializar los datos de cuenta
    passport.serializeUser(function (cuenta, done) {
        done(null, cuenta.id);
    });
    // Permite deserialize la cuenta de usuario
    passport.deserializeUser(function (id, done) {
        Cuenta.findOne({where: {id: id}, include: [{model: Persona, include: {model:Rol}}]}).then(function (cuenta) {
            if (cuenta) {
                var userinfo = {
                    id: cuenta.persona.external_id,                    
                    nombre: cuenta.persona.apellidos,
                    apellido: cuenta.persona.nombres,
                    cedula: cuenta.persona.cedula,
                    edad: cuenta.persona.edad,
                    fecha_nac: cuenta.persona.fecha_nac,
                    rol: cuenta.persona.rol.tipo,
                    correo:cuenta.correo                    
                };
                console.log(userinfo);
                done(null, userinfo);
            } else {
                done(cuenta.errors, null);
            }
        });
    });    
    //inicio de sesion
    passport.use('local-signin', new LocalStrategy(
            {
                usernameField: 'correo',
                passwordField: 'clave',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                var Cuenta = cuenta;
                var isValidPassword = function (userpass, password){
                    return bcrypt.compareSync(  password, userpass);
                }
                
                Cuenta.findOne({where: {correo: email}}).then(function (cuenta) {
                    if (!cuenta) {
                        return done(null, false, {message: req.flash('error', 'Cuenta no existe')});
                    }
                    if (!isValidPassword(cuenta.clave, password) ) {
                        return done(null, false, {message: req.flash('error', 'Clave incorrecta')});
                    }
                    var userinfo = cuenta.get();                                  
                    return done(null, userinfo);

                }).catch(function (err) {
                    console.log("Error:", err);
                    return done(null, false, {message: req.flash('error', 'Cuenta erronea')});
                });
            }
    ));
}

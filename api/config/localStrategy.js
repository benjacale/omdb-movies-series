const LocalStrategy = require("passport-local").Strategy;
const { User }      = require("../models");


const localStrategy = new LocalStrategy(
    {
    usernameField: "email",
    passwordField: "password",
    },
    
    function (email, password, done) {
        // Busca el usuario de "email" pasado como argumento y comprueba que la pass sea correcta.
        User.findOne( {where: {email}} )
        .then(user => {
            // User not found.
            if(!user) return done(null, false, {message: 'Incorrect username.'}); 

            // Si hay un usuario, valido la pass usando el mét. de instancia agregado al modelo User.
            user.generarHash(password, user.salt)
            .then(hash => {
                // Si la pass no coincide.
                if(hash !== user.password) return done(null, false, {message: 'Incorrect password.'});
                
                // Si la pass coincide.
                done(null, user);
            })
        })
        .catch(done);
    }
);

module.exports = localStrategy;

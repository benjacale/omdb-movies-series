// server configs
const express       = require("express");
const app           = express(); // Creamos una instancia de una app.
const db            = require("./config/db");
const router        = require("./routes/index");
const cookieParser  = require("cookie-parser");
const session       = require("express-session") // Me permite guardar sesiones de los usuarios loggeados.
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User          = require("./models/User");
const cors          = require ("cors");

app.use(cors());

// Middleware Global. Para ello, usamos el método use.
// Body Parser: servirá para interpretar el body de los requests. Todo lo que nos llega a req.body lo convierte a un objeto JS.
app.use(express.json());


// Parser que transforma de STRING a OBJETO la info contenida en una cookie.
// Popula req.cookie. Passport usará req.cookie para leer las cookies que haya generado previamente.
app.use(cookieParser());


// Popula req.session. Passport usará req.session para llevar un registro de quién está logueado en nuestra aplicación.
app.use( session({secret: "bootcamp", resave: true, saveUninitialized: true}) ) 


// Inicializamos Passport en nuestra app.
app.use(passport.initialize());


// Inicializamos el middleware de sesiones. Vinculamos la instancia de Passport con las sesiones configuradas en Express (definidas en la línea 23).
app.use(passport.session());


// Validamos si las credenciales son correctas.
passport.use(
    new LocalStrategy(
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
    )
);


// Ahora hay que explicarle a Passport cómo tiene que trabajar la sesión. Porque una vez que él valide que es correcto, va a querer crear una Cookie para enviar al Cliente y guardar en express-sessions una nueva sesion que diga "esta persona estuvo loggeada". Cómo hacemos eso? Con el serialize() y deserialize().

// Guardamos el id en la sesión (escribimos la cookie).
passport.serializeUser(function(user, done) {
    done(null, user.id);
});


// Obtenemos el usuario a partir del id guardado (leemos la cookie).
passport.deserializeUser(function(id, done) {
    User.findByPk(id)
    .then(user => done(null, user))
    .catch(done);
});


// Redirigimos todos los pedidos con /api.
app.use("/api", router);


// Sincronizamos la DB antes de levantar el servidor.
// Para dropear la DB, le colocamos el valor TRUE a force.
const PORT = 3001;

db.sync({force: false})
.then( () => {
    // Recién ahora estamos seguros que la conexión fue exitosa.
    console.log("Connected to database OMDB!");

    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}/`);
    });
})
.catch(console.error);
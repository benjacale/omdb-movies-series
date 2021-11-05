const express     = require("express");
const authRouter  = express.Router();
const User        = require("../models/User");
const passport    = require("passport");

// Todas las rutas de loggueo y registro.

// Registro.
authRouter.post("/register", (req, res, next) => {
    User.create(req.body)
    .then(newUser => res.status(201).send(newUser))
    
    //console.log("Funcionó POST api/auth/register");
});


// Login.
authRouter.post("/login", passport.authenticate('local'), (req, res, next) => {
    res.send(req.user);

    //console.log("Funcionó POST api/auth/login");
});


function isLoggedIn(req, res, next) {
    req.isAuthenticated() ? next() : res.sendStatus(401).send("Unauthorized");
};
  
// Página privada una vez loggeado.
authRouter.get("/secret", isLoggedIn, (req, res, next) => {
    req.user? res.send("cake.jpg") : res.sendStatus(401);
});


// Logout.
authRouter.post("/logout", (req, res, next) => {
    req.logOut();
    res.sendStatus(200);

    //console.log("Funcionó Funcionó POST api/auth/logout");
});


// Persistencia.
authRouter.get("/me", isLoggedIn, (req, res, next) => {
    res.send(req.user);
});


module.exports = authRouter;
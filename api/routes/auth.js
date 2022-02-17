const express         = require("express");
const router          = express.Router();
const AuthControllers = require("../controllers/auth");
const passport        = require("passport");
const isLoggedIn      = require("../middlewares/isLoggedIn");


// Todas las rutas de logueo y registro.
// Estamos en /api/auth.

router.post("/register", AuthControllers.register);                            // Registro.
router.post("/login", passport.authenticate('local'), AuthControllers.login ); // Login.
router.post("/logout", AuthControllers.logout);                                // Logout.
router.get("/me", isLoggedIn, AuthControllers.me);                             // Persistencia.


module.exports = router;
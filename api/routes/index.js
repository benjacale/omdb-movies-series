const express = require("express");
const users   = require("./users");
const auth    = require("./auth");
const router  = express.Router();

// Estamos en "/api".
router.use("/users", users);
router.use("/auth", auth);


module.exports = router;
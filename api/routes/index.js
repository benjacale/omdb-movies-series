const express         = require("express");
const router          = express.Router();
const userRouter      = require("./users");
const authRouter      = require("./auth");
//const favouriteRouter = require("./favourite");

// Estamos en "/api".
router.use("/users", userRouter);
router.use("/auth", authRouter);
//router.use("/favourite", favouriteRouter);





module.exports = router;

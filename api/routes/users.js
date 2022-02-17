const express          = require("express");
const router           = express.Router();
const UsersControllers = require("../controllers/users");

// Todas las rutas referente a un usuario.
// Estamos en /api/users.

router.get("/", UsersControllers.getAllUsers);      // Listar todos los usuarios.
router.get("/:id", UsersControllers.getOneUser);    // Buscar un usuario.
router.put("/:id", UsersControllers.editUser);      // Editar un usuario.
router.delete("/:id", UsersControllers.deleteUser); // Eliminar un usuario.


module.exports = router;
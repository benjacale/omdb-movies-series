const express     = require("express");
const userRouter  = express.Router();
const User        = require("../models/User");

// Todas las rutas referente a un usuario.

// Listar usuarios.
userRouter.get("/", (req, res, next) => {
    User.findAll()
    .then(users => res.send(users))
    .catch(next);

    console.log("Funcionó GET api/users");
});


// Buscar un usuario.
userRouter.get("/:id", (req, res, next) => {
    User.findOne({
        where: {id: req.params.id}
    })
    .then(user => user? res.send(user) : res.sendStatus(404) )
    .catch(next);

    console.log("Funcionó GET api/users/:id");
});


// Editar un usuario.
/* userRouter.put("/:id", (req, res, next) => {
    User.update(req.body, {
        where: {id: req.params.id},
        returning: true
    })
    .then(result => {
        res.send(result[1][0])
    })
    .catch( () => res.sendStatus(500));

    console.log("Funcionó PUT api/users/:id");
}); */

userRouter.put("/:id", (req, res, next) => {
    //console.log("BOOODY",  req.body)
    User.findOne({
        where: {id: req.params.id}
    })
    .then(res => res.dataValues.favourites)
    .then(arr => {
        //console.log("ARRAY1111", arr)

        const idP = arr.find(idPelicula => idPelicula === req.body.favourites)
        if(!idP) {
            arr.push(req.body.favourites)
            //console.log("ARRAAAY2222", arr)
        }
        else{
            
            arr = arr.filter(idPelicula => idPelicula !== req.body.favourites)
            //console.log("ARRAAAY3333", arr)
        }
        
        User.update({favourites: arr}, {
            where: {id: req.params.id},
            returning: true            
        })
        .then(data  => res.send(data[1][0]))
        
    })
    //.then( ()  => res.sendStatus(200))
    .catch(err => console.log(err));

    console.log("Funcionó PUT api/users/:id");
});

// Eliminar un usuario.
userRouter.delete("/:id", (req, res, next) => {
    User.destroy({
        where: { id: req.params.id}
    })
    .then(user => user? res.send(204) : res.send(404))
    .catch(next);

    //console.log("Funcionó DELETE api/users/:id");
});


module.exports = userRouter;
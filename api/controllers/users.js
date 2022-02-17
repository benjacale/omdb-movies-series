const { User } = require("../models");


class UsersControllers {
    
    static getAllUsers(req, res, next) {
        User.findAll()
        .then(users => res.send(users))
        .catch(next);
    };

    static getOneUser(req, res, next) {
        User.findOne({
            where: {id: req.params.id}
        })
        .then(user => user? res.send(user) : res.sendStatus(404) )
        .catch(next);
    };

    static  editUser(req, res, next) {
        User.update(req.body, { where: { id: req.params.id } })
        .then(res => console.log("RES FAV!! ", res))
        .then(() => res.sendStatus(301))
        .catch((err) => console.log(err));
    };

    static deleteUser(req, res, next) {
        User.destroy({
            where: { id: req.params.id}
        })
        .then(user => user? res.send(204) : res.send(404))
        .catch(next);
    };

};

module.exports = UsersControllers;
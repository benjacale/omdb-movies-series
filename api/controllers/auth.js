const { User } = require("../models");


class AuthControllers {
    
    static register(req, res, next) {
        User.create(req.body)
        .then(newUser => res.status(201).send(newUser))
        .catch(err => res.json(err))
    };

    static login(req, res, next) {
        res.send(req.user);
    };

    static logout(req, res, next) {
        req.logOut();
        res.status(200).send({})
    };

    static me(req, res, next)  {
        res.send(req.user);
    };
};

module.exports = AuthControllers;
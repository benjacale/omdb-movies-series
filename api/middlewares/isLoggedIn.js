const isLoggedIn= (req, res, next) => {
    req.isAuthenticated() ? next() : res.sendStatus(401).send("Unauthorized!");
};

module.exports = isLoggedIn;
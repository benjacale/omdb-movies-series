const Sequelize = require("sequelize");
const db        = require("../config/db");
const bcrypt    = require("bcrypt");

// User Model
class User extends Sequelize.Model {}

User.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: [/^[A-Za-z\s]+$/g]
        }
    },
    
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: [/^[A-Za-z\s]+$/g]
        }
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {isEmail: true},
        unique: [true, "Email already exists."]
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [8, 20]
        }
    },

    salt: {
        type: Sequelize.STRING
    },

    favourites: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: []
    }

}, {sequelize: db, modelName: "user"});


// Instance Method.
// Salt es un string alfanumérico random que nos ayuda a generar el hash junto con el plainPass.
User.prototype.generarHash = function(plainPass, salt) {
    return bcrypt.hash(plainPass, salt)
}


// Hook.
User.addHook("beforeCreate", (user) => {
    return bcrypt.genSalt(10)
    .then(salt => {
        user.favourites = [];
        user.salt = salt;
        return user.generarHash(user.password, user.salt);
    })
    .then(hash => user.password = hash)
});


module.exports = User;
const Sequelize = require("sequelize");
const db        = new Sequelize(
    "druvmglsoscid",
    "nvvxhpumbnsmke", 
    "02ebf03907b62adec8a8f6f858b8adf6ba662074a5e218eb1e04e631b0c60eba", {
    
    host: "ec2-54-156-110-139.compute-1.amazonaws.com",
    dialect: "postgres",
    logging: false,
    port: 5432,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = db;
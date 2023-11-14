require('dotenv').config;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
      // rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED.toLowerCase() === 'true' // Make sure to set the correct value in your .env
    }
  },
  logging: console.log,
  pool: {
    max: parseInt(process.env.DB_POOL_MAX, 10),
    min: parseInt(process.env.DB_POOL_MIN, 10),
    acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10),
    idle: parseInt(process.env.DB_POOL_IDLE, 10),
  },
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("../models/tutorial.js")(sequelize, Sequelize);
db.users = require("../models/users.js")(sequelize, Sequelize);

module.exports = db;

const dbConfig = require("./db.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require("../models/tutorial.js")(sequelize, Sequelize);
db.users = require("../models/users.js")(sequelize, Sequelize);
module.exports = db;

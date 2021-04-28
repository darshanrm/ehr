const env = require("./env");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.medications = require("../models/medications")(sequelize, Sequelize);

db.medication_pdf = require("../models/medicationPDFs")(sequelize, Sequelize);

db.issued_medicines = require("../models/issued_medicines")(
  sequelize,
  Sequelize
);

module.exports = db;

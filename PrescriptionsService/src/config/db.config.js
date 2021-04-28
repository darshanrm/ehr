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

db.prescriptions = require("../models/prescriptions")(sequelize, Sequelize);

db.prescription_pdf = require("../models/prescriptionPDFs")(
  sequelize,
  Sequelize
);

db.prescribed_medicines = require("../models/prescribed_medicines")(
  sequelize,
  Sequelize
);

module.exports = db;

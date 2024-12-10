const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const Coworking = require("./coworking")(sequelize, DataTypes);
const Student = require("./student")(sequelize, DataTypes);
const Booking = require("./booking")(sequelize, DataTypes);

const db = {};

db.Sequelize = sequelize;
db.Coworking = Coworking;
db.Student = Student;
db.Booking = Booking;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

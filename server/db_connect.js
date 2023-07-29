const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  "faculty_portal",
  "raju5",
  "1359a26c6E$",
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  });
//const sequelize = new Sequelize('postgresql://ssvgoc1:v2_44Bd5_gEdFUq8i2QHNhFFVFMqyzLv@db.bit.io:5432/ssvgoc1/mydist_faculty_personal?sslmode=true')
// old_connection const sequelize = new Sequelize('postgresql://ssvgoc1:v2_44Bd5_gEdFUq8i2QHNhFFVFMqyzLv@db.bit.io:5432/ssvgoc1/mydist_faculty_personal?sslmode=true')
module.exports = sequelize;

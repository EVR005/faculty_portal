const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize("faculty_portal", "raju5", "raju5", {
//   host: "localhost",
//   port: 3306,
//   dialect: "mysql",
//   dialectModule: require("mysql2"),
// });
//neondb
const sequelize = new Sequelize(
  "postgresql://edumbasankaravel513:5dgMQ8wrYKxc@ep-lingering-snowflake-94445869.ap-southeast-1.aws.neon.tech/faculty_portal?sslmode=require"
);
//sequelize
//const sequelize = new Sequelize('postgresql://ssvgoc1:v2_44Bd5_gEdFUq8i2QHNhFFVFMqyzLv@db.bit.io:5432/ssvgoc1/mydist_faculty_personal?sslmode=true')
// old_connection const sequelize = new Sequelize('postgresql://ssvgoc1:v2_44Bd5_gEdFUq8i2QHNhFFVFMqyzLv@db.bit.io:5432/ssvgoc1/mydist_faculty_personal?sslmode=true')
module.exports = sequelize;

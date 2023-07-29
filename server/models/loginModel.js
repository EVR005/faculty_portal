const sequelize = require("../db_connect");
const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");
const DataTypes = require("sequelize");
const constraints = require("../utils/data_constraints");
const Qualification = require("./qualifications");
const experiences = require("./experiences");
const Faculties = require("./faculty_personal");
const LoginModel = sequelize.define(
  "login_details",
  {
    email_id: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
},    emp_id: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
},

    password: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: { notNull: true, notEmpty: true }, //wont allow null
    },
    lastLoginTime:{
        allowNull: false,
        type: DataTypes.TEXT,
        validate: { notNull: true, notEmpty: true }, //wont allow null
    }  },
  {
    freezeTableName: true,
  }
);

// LoginModel.hasOne(Qualification,{
//     foreignKey:{
//         name: "emp_id"
//     }
// });
// Qualification.belongsTo(LoginModel);

// LoginModel.hasOne(experiences, {
//     foreignKey: {
//       name: "emp_id",
//     },
//   });
//   experiences.belongsTo(LoginModel);

  
// LoginModel.hasOne(Faculties, {
//     foreignKey: {
//       name: "emp_id",
//     },
//   });
// Faculties.belongsTo(LoginModel);

module.exports = LoginModel;
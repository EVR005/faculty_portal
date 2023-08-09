const sequelize = require("../db_connect");
const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");
const DataTypes = require("sequelize");
const constraints = require("../utils/data_constraints");

const Experiences = sequelize.define("experiences", {
  exp_college: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  emp_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  exp_description: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  exp_from: {
    allowNull: false,
    type: Sequelize.DATE,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  exp_to: {
    allowNull: false,
    type: Sequelize.DATE,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  nature_of_appointment: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  exp_years: {
    allowNull: false,
    type: DataTypes.INTEGER,
    validate: { notNull: true, notEmpty: true },
  },
});

module.exports = Experiences;

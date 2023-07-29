const sequelize = require("../db_connect");
const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");
const DataTypes = require("sequelize");
const constraints = require("../utils/data_constraints");

const Citations = sequelize.define("citations", {
    emp_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: { notNull: true, notEmpty: true }, //wont allow null
      },
  citation_1: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  h_index: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  citation_2: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  gs_citation: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  gs_h_index: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  gs_i10_index: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
  },
  
});

module.exports = Citations;


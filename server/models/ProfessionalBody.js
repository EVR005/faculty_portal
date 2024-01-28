const sequelize = require("../db_connect");
const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");
const DataTypes = require("sequelize");
const constraints = require("../utils/data_constraints");

const ProfBody = sequelize.define("profbody", {
  emp_id: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  title: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  subtitle: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
});

module.exports = ProfBody;

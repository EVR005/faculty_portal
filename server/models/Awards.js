const sequelize = require("../db_connect");
const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");
const DataTypes = require("sequelize");
const constraints = require("../utils/data_constraints");

const Awards = sequelize.define("awards", {
    "emp_id":{
        allowNull:false,
        type:DataTypes.TEXT,
    },
    "year":{
        allowNull:false,
        type:DataTypes.TEXT,
    },
    "award_title":{
        allowNull:false,
        type:DataTypes.TEXT,
    },
    "awarder":{
        allowNull:false,
        type:DataTypes.TEXT,
    },
});

module.exports = Awards;


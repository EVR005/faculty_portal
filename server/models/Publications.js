const sequelize = require("../db_connect");
const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");
const DataTypes = require("sequelize");
const constraints = require("../utils/data_constraints");

const Publications = sequelize.define("publications", {
    emp_id:{
        allowNull:false,
        type:DataTypes.TEXT,
    },
    title:{
        allowNull:false,
        type:DataTypes.TEXT,
    },
    citations:{
        allowNull:false,
        type:DataTypes.TEXT,
    },
    year:{
        allowNull:false,
        type:DataTypes.TEXT,
    }
    
});

module.exports = Publications;


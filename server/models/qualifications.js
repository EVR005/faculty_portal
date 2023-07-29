const sequelize = require("../db_connect");
const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");
const DataTypes = require("sequelize");
const constraints = require("../utils/data_constraints");
//degree,college,univ,%,class_year
const Qualification = sequelize.define("qualifications",{
    degree:{
        allowNull: false,
        type: DataTypes.TEXT,
        validate: { notNull: true, notEmpty: true }, //wont allow null
    },
    college:{
        allowNull: false,
        type: DataTypes.TEXT,
        validate: { notNull: true, notEmpty: true }, //wont allow null
    },
    university:{
        allowNull: false,
        type: DataTypes.TEXT,
        validate: { notNull: true, notEmpty: true }, //wont allow null
    },
    emp_id:{
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    percentage:{
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    class_year:{
        allowNull: false,
        type: DataTypes.INTEGER,
    },
});
module.exports = Qualification;
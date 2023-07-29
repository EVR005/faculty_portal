const sequelize = require("../db_connect");
const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");
const DataTypes = require("sequelize");
const constraints = require("../utils/data_constraints");

const Alerts = sequelize.define("alerts", {
    alert_content:{
        allowNull:false,
        type:DataTypes.TEXT,
    },
    datePosted:{
        allowNull:false,
        type: DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    },
});

module.exports = Alerts;


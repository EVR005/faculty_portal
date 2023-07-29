const Sequelize = require("sequelize");
const DataTypes = require("sequelize");

const PKConstraint = {
    allowNull: false,
    type: DataTypes.INTEGER,
    
    autoIncrement: true,
    primaryKey: true,
};

const TxtColNotNullConstraint = {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
};

const TxtColMayBeNullConstraint = {
    type: DataTypes.TEXT,
};
const IntMayBeNullConstraint = {
    type: DataTypes.INTEGER,
};

module.exports = {PKConstraint,TxtColMayBeNullConstraint,TxtColNotNullConstraint,IntMayBeNullConstraint};
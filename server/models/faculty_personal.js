const sequelize = require("../db_connect");
const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");
const DataTypes = require("sequelize");
const constraints = require("../utils/data_constraints");
const Qualification = require("./qualifications");
const experiences = require("./experiences");
const Faculties = sequelize.define(
  "personal_details",
  {
    first_name: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
},

    last_name: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
},

    middle_name: {
    type: DataTypes.TEXT,
},

    title: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
},

    email_id: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
},

    mobile_no: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
},

    gender: {
    type: DataTypes.TEXT,
},

    description: {
    type: DataTypes.TEXT,
},

    dob: {
    type: DataTypes.TEXT,
},

    age: {
      type: DataTypes.INTEGER,
  },

    aadhar: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
},

    pancard: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: { notNull: true, notEmpty: true }, //wont allow null
},

    present_address: {
    type: DataTypes.TEXT,
},

    permanent_address: {
    type: DataTypes.TEXT,
},

    passport_no: {
    type: DataTypes.TEXT,
},

    social_category: {
    type: DataTypes.TEXT,
},

    position: {
    type: DataTypes.TEXT,
},

    orcid_id: {
    type: DataTypes.TEXT,
},

    scopus_id: {
    type: DataTypes.TEXT,
},

    google_scholar_id: {
    type: DataTypes.TEXT,
},

    photo: {
    type: DataTypes.TEXT,
},


    irins_id: {
    type: DataTypes.TEXT,
},

emp_id: {
    type: DataTypes.TEXT,
},
  },
  {
    freezeTableName: true,
  }
);

module.exports = Faculties;
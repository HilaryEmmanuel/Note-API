const {Sequelize} = require('sequelize');
require('dotenv').config();

const dbconnection = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {dialect : "postgres",dialectOptions : {ssl :true}})
// const dbconnection = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {dialect : "postgres"})


module.exports = {dbconnection};
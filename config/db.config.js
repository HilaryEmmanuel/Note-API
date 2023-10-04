const {Sequelize} = require('sequelize');
require('dotenv').config();

const dbconnection = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {dialect : "postgres",dialectOptions : {ssl :true, }})
    // database : process.env.DB_NAME,
    // username : process.env.DB_USER,
    // password : process.env.DB_PASS,
    // host : process.env.DB_HOST,
    // port : process.env.DB_PORT,
    // dialect : process.env.DIALECT,
    // logging: false /* raw queries should not be loggged to the console */


module.exports = {dbconnection};
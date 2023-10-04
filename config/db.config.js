const { native } = require('pg');
const { ssl } = require('pg/lib/defaults');
const {Sequelize} = require('sequelize');
require('dotenv').config();

const dbconnection = new Sequelize(process.env.DB_URL, {dialect : "postgres",dialectOptions : {ssl :true, }})
    // database : process.env.DB_NAME,
    // username : process.env.DB_USER,
    // password : process.env.DB_PASS,
    // host : process.env.DB_HOST,
    // port : process.env.DB_PORT,
    // dialect : process.env.DIALECT,
    // logging: false /* raw queries should not be loggged to the console */


module.exports = {dbconnection};
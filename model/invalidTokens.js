const {Sequelize, DataTypes, UUIDV4} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {dialect : "postgres",dialectOptions : {ssl :true}})
sequelize.sync()

const tokens = sequelize.define('invalidtokens', {
    /* Model Attributes */
    user_id:{
        type : DataTypes.BIGINT,
        autoIncrement : true,
        primaryKey: true
        
    },

    jwt_token:{
        type: DataTypes.BLOB,
        allowNull: false
    },


}, {
    createdAt: false,
    updatedAt:false
})

module.exports = tokens
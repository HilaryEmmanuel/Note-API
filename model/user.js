const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { dialect: "postgres", dialectOptions: { ssl: true, } , logging : false})
// const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {dialect : "postgres"})
// sequelize.sync()
// sequelize.sync({ force : true})
const users = sequelize.define('users', {
    /* Model Attributes */
    user_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.BLOB,
        allowNull: false,
    },

    salt: {
        type: DataTypes.BLOB,
        allowNull: false
    },


}, {
    createdAt: false,
    updatedAt: false,
})


module.exports = users;
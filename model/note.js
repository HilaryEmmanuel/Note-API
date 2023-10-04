const {Sequelize, DataTypes, DATE} = require('sequelize');
// const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
//     logging:false, /* raw queries should not be loggged to the console */
//     define:{
//         freezeTableName:true
//     }
// });
const sequelize = new Sequelize(process.env.DB_URL, {dialect : "postgres",dialectOptions : {ssl :true, }})
const notes = sequelize.define('notes', {
    /* model Attributes */
    note_id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },

    user_id:{
        type: DataTypes.BIGINT,
        allowNull: false

    },

    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    note:{
        type: DataTypes.STRING(1000),
        allowNull: false
    },
  
    image:{
        type: DataTypes.BLOB,
        allowNull: true
    },

    audio_note:{
        type: DataTypes.BLOB,
        allowNull: true
    },

    created_at:{
        type: DataTypes.DATE,
        allowNull: true,

    }
}, {
    createdAt:false,
    updatedAt:false
})

module.exports = notes;
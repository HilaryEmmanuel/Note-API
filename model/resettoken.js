const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    logging:false, /* raw queries should not be loggged to the console */
    define:{
        freezeTableName:true
    }
});
const resetToken = sequelize.define('resettoken', {
    token_id:{
        type : DataTypes.BIGINT,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    
    token:{
        type:DataTypes.UUID,
        allowNull : false
    },

    email:{
        type: DataTypes.STRING,
        allowNull : false,
        validate : {
            isEmail : true
        }
    },

    tokenexpiration:{
        type: DataTypes.TIME,
        allowNull: false
    }
},{
    createdAt : false,
    updatedAt : false,
})
module.exports = {resetToken}
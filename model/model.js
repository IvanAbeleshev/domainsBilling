const Sequelize = require('../db');
const {DataTypes} = require('sequelize');
const { password } = require('pg/lib/defaults');

const domain = Sequelize.define('domains',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull:false
    },
    
    login: {
        type: DataTypes.STRING,
        unique: false,
        allowNull:false
    },

    password:{
        type: DataTypes.STRING,
        unique: false,
        allowNull:false
    },

    tocken:{
        type: DataTypes.STRING,
        unique: false,
        allowNull:false
    }
});


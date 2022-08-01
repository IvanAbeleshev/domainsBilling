const Sequelize = require('../db');
const {DataTypes} = require('sequelize');

const accountGodaddy = Sequelize.define('accountGodaddy',
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

    key:{
        type: DataTypes.STRING,
        unique: false,
        allowNull:false
    },

    secret:{
        type: DataTypes.STRING,
        unique: false,
        allowNull:false
    }
});

const domainsDataGodaddy = Sequelize.define('domainsDataGodaddy', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdAtGoDaddy: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deleteAtGoDaddy: {
        type: DataTypes.DATE,
        allowNull: true
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: false
    },
    domainId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expirationProtected: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    expires: {
        type: DataTypes.DATE,
    },
    exposeWhois: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    holdRegistrar: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    locked: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    nameServers: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    privacy: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    registrarCreatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    renewAuto: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    renewable: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    transferProtected: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});

accountGodaddy.hasMany(domainsDataGodaddy);
domainsDataGodaddy.belongsTo(accountGodaddy);

const accountNamecheap = Sequelize.define('accountNamecheap',
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

    key:{
        type: DataTypes.STRING,
        unique: false,
        allowNull:false
    }
});

const domainsNamecheap = Sequelize.define('domainsNamecheap', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idDomen: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created: {
        type: DataTypes.DATE,
        allowNull: true
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isExpired: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    isLocked: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    autoRenew: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    whoisGuard: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isPremium: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    isOurDNS: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});

accountNamecheap.hasMany(domainsNamecheap);
domainsNamecheap.belongsTo(accountNamecheap);

module.exports = {domainsDataGodaddy, accountGodaddy, domainsNamecheap, accountNamecheap}
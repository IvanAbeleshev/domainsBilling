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
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
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
        allowNull: false
    },
    expires: {
        type: DataTypes.DATE,
    },
    exposeWhois: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    holdRegistrar: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    locked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nameServers: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    privacy: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    registrarCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    renewAuto: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    renewDeadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    renewable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transferProtected: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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
        allowNull: false
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isExpired: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isLocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    autoRenew: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    whoisGuard: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isPremium: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isOurDNS: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

accountNamecheap.hasMany(domainsNamecheap);
domainsNamecheap.belongsTo(accountNamecheap);

module.exports = {domainsDataGodaddy, accountGodaddy, domainsNamecheap, accountNamecheap}
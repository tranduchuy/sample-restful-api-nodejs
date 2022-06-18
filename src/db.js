const {Sequelize} = require('sequelize');
const DB_URL = process.env.DB_URL;
const sequelize = new Sequelize(DB_URL);

module.exports = sequelize;

const { Sequelize } = require('sequelize');

const DB_NAME = 'node-react-todo';
const USER_NAME = 'root';
const PASSWORD = 'Qwezxcasd1*';

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
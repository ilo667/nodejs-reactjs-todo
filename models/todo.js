const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const todo = sequelize.define('todos', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = todo;
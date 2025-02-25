const { Sequelize } = require('sequelize');
const keys = require('../keys');

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        keys.DB_NAME,
        keys.DB_USER,
        keys.DB_PW,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
        },
    );
}

module.exports = sequelize;
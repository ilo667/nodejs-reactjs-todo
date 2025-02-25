const { Sequelize } = require('sequelize');

let sequelize;

const DB_NAME = 'node-react-todo';
const USER_NAME = 'root';
const PASSWORD = 'Qwezxcasd1*';

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME || DB_NAME,
        process.env.DB_USER || USER_NAME,
        process.env.DB_PW || PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
        },
    );
}

module.exports = sequelize;
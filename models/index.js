const CONFIG = require("../config/db.config");

const Sequelize = require("sequelize");
const products = require("./products.model");

const { DB, USER, PASSWORD, HOST, dialect, pool } = CONFIG;

const connection = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect,
        operatorsAliases: false,
        pool: {
            max: pool.max,
            min: pool.min,
            acquire: pool.acquire,
            idle: pool.idle,
        }
    },
);

const db = {
    Sequelize,
    connection,
    products: products(connection, Sequelize),
};

module.exports = db;
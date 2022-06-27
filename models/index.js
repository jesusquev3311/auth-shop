const CONFIG = require("../config/db.config");

const Sequelize = require("sequelize");
const products = require("./products.model");
const users = require("./user.model");
const basket = require("./basket.model");

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
    users: users(connection, Sequelize),
    basket: basket(connection, Sequelize),
};

module.exports = db;
module.exports = {

    HOST: "localhost",

    USER: "zuz",

    PASSWORD: "password",

    DB: "auth_shop",

    dialect: "mysql",

    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};
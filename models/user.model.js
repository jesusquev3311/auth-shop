module.exports = (connection, Sequelize) => {
    const User = connection.define("user", {
        loginName: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
    });

    return User;
};
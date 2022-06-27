module.exports = (connection, Sequelize) => {
    const Basket = connection.define("basket", {
        productID: { type: Sequelize.INTEGER },
        userID: { type: Sequelize.INTEGER },
    });

    return Basket;
};
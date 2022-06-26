module.exports = (connection, Sequelize) => {
    const Basket = connection.define("basket", {
        productID: { type: Sequelize.NUMBER },
        userID: { type: Sequelize.NUMBER },
    });

    return Basket;
};
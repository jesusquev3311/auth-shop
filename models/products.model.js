module.exports = (connection, Sequelize) => {
    const Products = connection.define("product", {
        name: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
    });

    return Products;
};
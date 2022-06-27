const db = require("../models");
const Basket = db.basket;

exports.create = (req, res) => {
    const { productID, userID } = req.body;

    if (!(productID && userID)) {
        res.status(400).send({
            message: "productID and userID are required"
        });

        return;
    }

    const Item = {
        productID,
        userID,
    };

    Basket.create(Item)
    .then(res => res.status(200).send(data))
    .catch(err => res.status(500).send({
        message: err.message || "something wen't wrong, please try again."
    }));
};

exports.findAll = (req, res) => {
    const { userID } = req.query;

    const condition = userID ? { userID: { [op.like]: `%${userID}%` } } : null;

    Basket.findAll({where: condition})
    .then((data) => res.status(200).send(data))
    .catch(err => res.status(500).send({
            message: err.message || "something went wrong, while getting Basket, please try again."
        })
    );
};

exports.findOne = (req, res) => {
    const { id } = req.params;

    Basket.findByPk(id)
    then(data => {
        if (!data) {
            res.status(404).send({
                message: `Item id: ${id} - Not Found.`
            })
        }
        res.status(200).send(data)
    })
    .catch(err => res.status(500).send({
        message: err.message || `Error getting item id: ${id}.`
    }));
};

exports.update = (req, res) => {
    const { id } = req.params.id;

    Basket.update(req.body, { where: id })
    .then(resp => {
        if (resp === 1) {
            res.send({
                message: "Basket updated successfully"
            });
        } else {
            res.send({
                message: `Cannot update item id: ${id}. Please try again`
            });
        }
    })
    .catch(err => res.send({
        message: err.message || "someting went wrong. Please try again."
    }))
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Basket.destroy({ where: { id: id }})
    .then(resp =>{
        if (resp == 1) {
            res.send({
                message: "Item was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Item with id=${id}. Please try again.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Something went wron. Please try again."
        });
    });
};

exports.deleteAll = (req, res) => {
    Basket.destroy({
        where: {},
        truncate: false
    })
    .then(resp => {
        res.send({ message: `${resp} Basket were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all Users."
        });
    });
};
const db = require("../models");
const Products = db.products;

exports.create = (req, res) => {
    const { name, type, description } = req.body;
    if (!(name && type)) {
        res.status(400).send({
            message: "name and Type are required"
        });

        return;
    }

    const product = {
        name,
        type,
        description,
    };

    Products.create(product)
    .then(res => res.status(200).send(data))
    .catch(err => res.status(500).send({
        message: err.message || "something wen't wrong, please try again."
    }));
};

exports.findAll = (req, res) => {
    const { name } = req.body;

    const condition = name ? { name: { [op.like]: `%${name}%` } } : null;

    Products.findAll({where: condition})
    .then((data) => res.status(200).send(data))
    .catch(err => res.send({
        message: err.message || "something went wrong, while getting products, please try again."
    }));
};

exports.findOne = (req, res) => {
    const { id } = req.params;

    Products.findByPk(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({
        message: err.message || `Error getting product id: ${id}.`
    }));
};

exports.update = (req, res) => {
    const { id } = req.params.id;

    Products.update(req.body, { where: id })
    .then(resp => {
        if (resp === 1) {
            res.send({
                message: "Product updated successfully"
            });
        } else {
            res.send({
                message: `Cannot update product id: ${id}. Please try again`
            });
        }
    })
    .catch(err => res.send({
        message: err.message || "someting went wrong. Please try again."
    }))
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Products.destroy({ where: { id: id }})
    .then(resp =>{
        if (resp == 1) {
            res.send({
                message: "Product was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete product with id=${id}. Please try again.`
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
    Products.destroy({
        where: {},
        truncate: false
    })
    .then(resp => {
        res.send({ message: `${resp} Productss were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all Productss."
        });
    });
};
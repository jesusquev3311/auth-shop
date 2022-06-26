const db = require("../models");
const Users = db.users;

exports.create = (req, res) => {
    const { loginName, password } = req.body;
    if (!(loginName && password)) {
        res.status(400).send({
            message: "loginName and password are required"
        });

        return;
    }

    const user = {
        loginName,
        password,
    };

    Users.create(user)
    .then(res => res.status(200).send(data))
    .catch(err => res.status(500).send({
        message: err.message || "something wen't wrong, please try again."
    }));
};

exports.findAll = (req, res) => {
    const { loginName } = req.body;

    const condition = loginName ? { loginName: { [op.like]: `%${loginName}%` } } : null;

    Users.findAll({where: condition})
    .then((data) => res.status(200).send(data))
    .catch(err => res.status(500).send({
            message: err.message || "something went wrong, while getting Users, please try again."
        })
    );
};

exports.findOne = (req, res) => {
    const { id } = req.params;

    Users.findByPk(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({
        message: err.message || `Error getting user id: ${id}.`
    }));
};

exports.update = (req, res) => {
    const { id } = req.params.id;

    Users.update(req.body, { where: id })
    .then(resp => {
        if (resp === 1) {
            res.send({
                message: "user updated successfully"
            });
        } else {
            res.send({
                message: `Cannot update user id: ${id}. Please try again`
            });
        }
    })
    .catch(err => res.send({
        message: err.message || "someting went wrong. Please try again."
    }))
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Users.destroy({ where: { id: id }})
    .then(resp =>{
        if (resp == 1) {
            res.send({
                message: "User was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete user with id=${id}. Please try again.`
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
    Users.destroy({
        where: {},
        truncate: false
    })
    .then(resp => {
        res.send({ message: `${resp} Users were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all Users."
        });
    });
};
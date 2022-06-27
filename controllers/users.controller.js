const db = require("../models");
const bcrypt = require('bcrypt');

const Users = db.users;
const saltRounds = 10;

exports.create = async (req, res) => {
    const { loginName, password } = req.body;

    if (!(loginName && password)) {
        res.status(400).send({
            message: "loginName and password are required"
        });

        return;
    }

    const user = {
        loginName,
        password
    };

    const checkUser =  await Users.findAll({where: {loginName: user.loginName}});

    if (!(user.loginName && user.password)) {
        res.status(400).send({
            message: "Login name and password are required"
        });

        return
    }

    if (checkUser.loginName) {
        res.status(400).send({
            message: "User already exist. Please login or change loginName"
        });

        return
    };
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            res.status(400).send( {message: err.message || "something went wrong"});

            return
        }

        Users.create({...user, password: hash})
            .then(data => res.status(200).send(data))
            .catch(err => res.send({
                message: err.message || "something wen't wrong, please try again."
            }));
    });
};

exports.findAll = (req, res) => {
    const { loginName } = req.query;

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
    then(data => {
        if (!data) {
            res.status(404).send({
                message: `User id: ${id} - Not Found.`
            })
        }
        res.status(200).send(data)
    })
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
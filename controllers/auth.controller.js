const db = require("../models");
const bcrypt = require('bcrypt');

const Users = db.users;
const saltRounds = 10;


exports.register = async (req, res) => {
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

    
    if (!(user.loginName && user.password)) {
        res.status(400).send({
            message: "Login name and password are required"
        });
        
        return
    }

    const checkUser =  await Users.findOne({where: {loginName: user.loginName}});

    if (checkUser && checkUser.loginName) {
        return res.status(400).send({
            message: "User already exist. Please login or change loginName"
        });
    };
    
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            return res.status(400).send( {message: err.message || "something went wrong"});
        }

        Users.create({...user, password: hash})
            .then(data => res.status(200).send(data))
            .catch(err => res.send({
                message: err.message || "something wen't wrong, please try again."
            }));
    });
};

exports.login = async (req, res) => {
    const { loginName, password } = req.body;
    
    console.log("login: ", loginName, password);

    if (!(loginName && password)){
        return res.status(400).send({
            message: "Login name and password are required"
        })
    }

    const user =  await Users.findOne({where: {loginName}});

    if (!user.loginName) {
        return res.status(400).send({
            message: "User not found. Please check your credentials!"
        });
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
        return res.status(400).send({
            message: "Wrong password. please check your credentials"
        });
    }

    res.status(200).send({
        message: `Welcome back ${user.loginName}!`
    });
};
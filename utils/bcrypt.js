const bcrypt = require('bcrypt');

exports.cryptPassword = (password) => {

   
};

exports.comparePassword = (plainPass, hashword) => {
    bcrypt.compare(plainPass, hashword, (err, result) => {
        if (err) {
            return { message: "Password doesn't match" };
        }

        return result;
    });
};
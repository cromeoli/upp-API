const usersModel = require("../database/usersModel")

function checkUser(userData){
    console.log(userData);
    return usersModel.findUserCredentials(userData);
}

function findUserId(user){
    return usersModel.findUserCredentials(user).id;
}

module.exports = {
    checkUser
}
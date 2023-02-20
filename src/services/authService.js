const usersModel = require("../database/usersModel")

function checkUser(loginData){
    console.log(`En el servicio...`);
    return usersModel.findUserCredentials(loginData);
}

function findUserId(loginData){
    return usersModel.getUserId(loginData);
}

module.exports = {
    checkUser,
    findUserId
}
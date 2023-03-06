const usersModel = require("../database/usersModel")

function checkUser(loginData){
    console.log(`En el servicio...`);
    return usersModel.findUserCredentials(loginData);
}

function findUserId(loginData){
    return usersModel.getUserId(loginData);
}

function findUsername(id){
    return usersModel.getAuthorUsername(id);
}

module.exports = {
    checkUser,
    findUserId,
    findUsername
}
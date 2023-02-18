const users = require("./users.json");
const fs = require("fs");

function insertUser(newUser) {

    // Modificamos el objeto datos
    users.users.push(newUser);

    // Escribimos los nuevos datos en el fichero JSON
    fs.writeFileSync(
        "./src/database/users.json",
        JSON.stringify(users, null, 2),
        "utf8"
    );

    return newUser;
}

function deleteUser(id) {
    return undefined;
}

function getUsername(username) {
    return undefined;
}

function getEmail(email) {
    return undefined;
}

function findUserCredentials(userData){
    console.log(userData)

    return users.users.find(
        (usuario) => usuario.email === userData.email
                     && usuario.passwd === userData.passwd
    );
}

module.exports = {
    insertUser,
    deleteUser,
    getUsername,
    getEmail,
    findUserCredentials
};




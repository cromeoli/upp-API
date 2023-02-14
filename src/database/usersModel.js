const users = require("./users.json");
const fs = require("fs");

function insertUser(id, newUser) {

    // Modificamos el objeto datos
    users.users[id] = newUser;

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

module.exports = {
    insertUser,
    deleteUser,
    getUsername,
    getEmail
};




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

function getUser(id){
    const userData = users.users.find(
        user => id === user.id)
    return userData
}

function getUsername(receivedUsername) {
    return !!users.users.find(
        (dbUserdata) => dbUserdata.username === receivedUsername
    );
}

function getEmail(receivedEmail) {
    return !!users.users.find(
        (dbUserdata) => dbUserdata.email === receivedEmail
    );
}

function getUserId(loginData){

    //TODO Comprobar si la contraseña es correcta??

    const userData = users.users.find(
        user => loginData.email === user.email)

    return userData.id
}

function findUserCredentials(receivedUserData){
    console.log(`Comprobando credenciales...`);

    const checkedUserdata = users.users.find(
        (dbUserdata) => dbUserdata.email === receivedUserData.email
            && dbUserdata.passwd === receivedUserData.passwd
    );

    console.log(`Comprobando credenciales... Este es el resultado: ${checkedUserdata}`);

    return checkedUserdata
}

function updateUser(id, newData){

    // Comprobamos que exista el usuario
    const userIndex = users.users.findIndex(user => user.id === id)

    if (!userIndex) {

        //Si no existe, devolvemos false
        return false;

    } else {

        // Cambiamos los datos
        users.users[userIndex] = newData;

        // Para devolver el resultado final creamos esta variable con los datos ya actualizados
        const updatedUser = users.users[userIndex]


        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/users.json",
            JSON.stringify(users, null, 2),
            "utf8"
        );

        return updatedUser;

    }
}

function deleteUser(id){

    // Vemos si existe el producto
    const userIndex = users.users.findIndex(user => user.id === id)

    if (userIndex === -1) {

        // Si no existe, devolvemos false
        return false;

    } else {

        // Borramos el producto del objeto datos
        const deletedUser = users.users.splice(userIndex, 1);

        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/users.json",
            JSON.stringify(users, null, 2),
            "utf8"
        );

        return deletedUser;

    }

}

module.exports = {
    insertUser,
    deleteUser,
    getUsername,
    getEmail,
    findUserCredentials,
    getUser,
    updateUser,
    getUserId
};




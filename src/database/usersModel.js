const users = require("./users.json");
const fs = require("fs");
const posts = require("./posts.json");

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

function findUserCredentials(receivedUserData){
    console.log(receivedUserData)

    return users.users.find(
        (dbUserdata) => dbUserdata.email === receivedUserData.email
                     && dbUserdata.passwd === receivedUserData.passwd
    );
}

function updateUser(id, nuevosDatos){

    // Comprobamos que exista la publicación
    const userIndex = users.users.findIndex(user => user.id === id)

    if (!userIndex) {

        //Si no existe, devolvemos false
        return false;

    } else {

        // Cambiamos los datos
        posts.posts[userIndex] = nuevosDatos;

        // Para devolver el resultado final creamos esta variable con los datos ya actualizados
        const updatedPost = posts.posts[userIndex]


        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/posts.json",
            JSON.stringify(posts, null, 2),
            "utf8"
        );

        return updatedPost;

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
        const deletedUser = posts.posts.splice(userIndex, 1);

        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/posts.json",
            JSON.stringify(posts, null, 2),
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
    findUserCredentials
};




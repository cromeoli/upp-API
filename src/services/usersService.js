const {v4: uuid} = require("uuid");
const usersModel = require("../database/usersModel");

function getEmail(email) {
    return usersModel.getEmail(email);
}

function getUsername(user) {
    return usersModel.getUsername(user);
}

/*
* Función service que aplica lógica de negocio añadiendo fechas e id a un usuario, para enviarlas
* luego al modelo y añadirlo a post.json
* */
const createUser = (userData) => {

    // Creamos un ID
    const id = uuid();

    // Creamos un usuario nuevo y le añadimos los datos recibidos del controlador
    const newUser = {
        "id":id,
        ...userData,
        fechaRegistro: new Date().toLocaleDateString()
    };

    // Enviamos el usuario al modelo para que éste la inserte en posts.json
    return usersModel.insertUser(newUser);
}

//TODO updateUser

function deleteUser(id) {
    return usersModel.deleteUser(id);
}



module.exports = {
    createUser,
    getEmail,
    getUsername,
    deleteUser
};

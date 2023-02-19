const {v4: uuid} = require("uuid");
const usersModel = require("../database/usersModel");
const postModel = require("../database/postsModel");

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

function deleteUser(id) {
    return usersModel.deleteUser(id);
}

function getUser(id){
    return usersModel.getUser(id)
}

const updateUser = (id,newUserData) => {

    // Obtiene los datos actuales del usuario
    const userData = usersModel.getUser(id);

    // Recorro los campos comprobando si existen en los datos
    for (let field in userData) {
        if (newUserData.hasOwnProperty(field)) {

            //Si existen, los actualizo
            userData[field] = newUserData[field];
        }
    }

    //Actualiza la fecha de modificación
    userData.fechaModificacion = new Date().toLocaleDateString;

    // Envía los datos al modelo para que éste actualice los datos
    return usersModel.updateUser(id, userData);

};

module.exports = {
    createUser,
    getEmail,
    getUsername,
    deleteUser,
    updateUser,
    getUser
};

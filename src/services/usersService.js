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

//TODO updateUser

function deleteUser(id) {
    return usersModel.deleteUser(id);
}

const updateUser = (id,newUserData) => {

    // Obtiene los datos actuales del usuario
    const postData = postModel.getOnePost(id);

    // Recorro los campos comprobando si existen en los datos
    for (let field in postData) {
        if (newPostData.hasOwnProperty(field)) {

            //Si existen, los actualizo
            postData[field] = newPostData[field];
        }
    }

    //Actualiza la fecha de modificación
    postData.fechaModificacion = new Date().toLocaleDateString;

    // Envía los datos al modelo para que éste actualice los datos
    return postModel.updateOnePost(id, postData);

};

module.exports = {
    createUser,
    getEmail,
    getUsername,
    deleteUser
};

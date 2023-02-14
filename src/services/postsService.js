const postModel = require("../database/postsModel");
const {v4: uuid} = require("uuid");

/*
*  Función service que llama a la función getTenPosts del modelo para que envíe 10 posts.
* */
const getTenPosts = (pages = 1) => {
    return postModel.getTenPosts(pages);
}

/*
* Función service que aplica lógica de negocio añadiendo fechas e id a un post, para enviarlas
* luego al modelo y modificarlo en post.json
* */
const createOnePost = (updatedPostData) => {

    // Creamos un ID
    const id = uuid();

    // Creamos un post nuevo con los datos modificados
    const newPost = {
        ...updatedPostData,
        fechaSubida: new Date().toLocaleDateString(),
        fechaModificacion: new Date().toLocaleDateString()
    };

    // Enviamos la publicación al modelo para que éste la inserte en posts.json
    return postModel.insertOnePost(id, newPost);
}

/*
* Pide al modelo los datos de un post concreto
* */
const getOnePost = (id) => {
    return postModel.getOnePost(id);

};

/*
* Funcion service que pide al modelo que elimine un post concreto
* */
const deleteOnePost = (id) => {
    return postModel.deleteOnePost(id);
};


/*
* Función service que envía al modelo información para actualizar un post y aplica
* lógica de negocio para actualizar su fecha de modificación
* */
const updateOnePost = (id,newPostData) => {

    // Obtiene el producto actual
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
    getTenPosts,
    createOnePost,
    getOnePost,
    updateOnePost,
    deleteOnePost,
};
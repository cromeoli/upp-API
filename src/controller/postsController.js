/*
*   ----/// CONTROLADOR DE POSTS
*
*   El controlador de los posts se encarga de:
*       1- Recibir los datos de las peticiones
*       2- Enviarlos al servicio para que las procese
*       3- Devolver una respuesta a la petición
*
*/

const postsServices = require("../services/postsService");

/*  FIRST TEN POSTS

*   //////////
*   GET /api/v1/posts
*   //////////
*
*   Devuelve los 10 primeros posts del archivo posts.json
*/

const getTenPosts = (req, res, next) => {

    // Capturamos los parametros de paginación en la URL si existen
    const { pages } = req.params;

    // Hacemos la petición al servicio
    const allPosts = postsServices.getTenPosts(pages);


    if (Object.keys(allPosts).length !== 0) {

        res.send(allPosts);

    } else {

    //Si no se encuentran publicaciones, devolvemos un array vacío

        res.send([]);

    }

    res.end();

};

/*  CREATE NEW POST

*   /////////
*   POST /api/v1/posts
*   /////////
*
*   Crea un post nuevo partiendo de los datos del body adjuntados en la petición
*
*/

const createOnePost = (req, res, next) => {

    // Cuerpo de la petición POST HTTP
    const { body } = req;


    // Comprobamos que los datos del cuerpo son correctos
    if (!body.titulo || !body.contenido || !body.tipo)

        // El cuerpo de la petición no contiene los datos suficientes.
        // Entonces enviamos Código HTTP 400: Bad request
        res.status(400).send({mensaje: "Una publicación debe componerse de: titulo, contenido y tipo"});

    else {

        // Creamos un objeto "post" para almacenarlo en la base de datos

        const newPost = {
            "titulo":body.titulo,
            "autor":req.usernamem,
            "upps":[],
            "contenido":body.contenido,
            "tipo":body.tipo
        }

        // Llamamos al servicio para que cree la publicación
        postsServices.createOnePost(newPost);

        if (newPost) {

            res.status(200).send({newPost,mensaje: `Se ha añadido la publicación con título ${body.titulo}`});

        } else {

            // Enviamos una petición HTTP 406: No aceptado
            res.status(406).send({mensaje: "Ha habido un error, publicación no creada - postsController"});

        }

    }

    res.end();

};

/*  GET ONE POST
*
*   //////////
*   GET /api/v1/post/:id
*   /////////
*
*   Devuelve los datos de una publicación concreta especificada como parámetro de la URL de la petición.
*
*/

const getOnePost = (req, res, next) => {

    // Id de la publicación
    const { id } = req.params;

    // Llamamos al servicio y le enviamos el id que hemos extraído
    const onePost = postsServices.getOnePost(id);

    // Comprobamos que el post existe,
    if (onePost) {

        //Si hay, lo envío
        res.send(onePost);

    } else {
        //Si no, se devuelve un código HTTP 404 - File not found
        res.status(404).send({ mensaje: "Ese id de publicación no existe - postController" });

    }

    res.end();

};

/* UPDATE ONE POST
*
*   //////////////
*   PUT /api/v1/posts/:id
*   //////////////
*
*   Modifica una publicación dejando intactos los demás datos
*
*/

const updateOnePost = (req, res, next) => {

    // Capturamos el Id de la publicación
    const { id } = req.params;

    // Capturamos los nuevos datos del cuerpo de la petición
    const { body } = req;

    // Llamamos al servicio para comprobar que la publicación que queremos actualizar existe
    const exists = postsServices.getOnePost(id);

    if (exists) {
        // Si existe La actualizamos
        const updatedPost = postsServices.updateOnePost(id, body);

        if (updatedPost) {

            //Si se actualiza bien, enviamos un código HTTP 200 - Éxito
            res.status(200).send({updatedPost,mensaje: "La publicación se ha modificado con éxito"});

        } else {

            //Si no se ha actualizado bien, enviamos un código HTTP 406 - Not aceptable
            res.status(406).send({mensaje: "Error al actualizar la publicación - postsController"});

        }

    } else {

        //Si la publicación no existe, enviamos un código HTTP 404 - Not Found
        res.status(404).send({mensaje: "El id de la publicación enviada no existe - postsController"});

    }

    res.end();

}

/*  DELETE ONE POST
*
*   //////////
*   DELETE /api/v1/posts/:id
*   //////////
*
*   Elimina la publicación con el id que se ha pasado por parámetro en la URL
*
*/

const deleteOnePost = (req, res, next) => {

    // Capturamos el Id de la publicación
    const { id } = req.params;

    // Llamamos al servicio para que se encargue de eliminar la publicación
    const deletedPost = postsServices.deleteOnePost(id);

    // Comprobamos si efectivamente se ha borrado
    if (!deletedPost) {

        res.status(404).send({mensaje: "La publicación no se ha eliminado correctamente - postsController"});

    } else {

        res.status(200).send({deletedPost,mensaje: "Publicación borrada"});

    }

    res.end();

};

module.exports = {
    getTenPosts,
    createOnePost,
    getOnePost,
    updateOnePost,
    deleteOnePost,
};
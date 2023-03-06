/*
*   ----/// CONTROLADOR DE USUARIOS
*
*   El controlador de los usuarios se encarga de:
*       1- Recibir los datos de las peticiones
*       2- Enviarlos al servicio para que las procese
*       3- Devolver una respuesta a la petición
*
*   Notas *
*   - No se van a devolver usuarios completos porque contienen las contraseñas
*
*/

const usersServices = require("../services/usersService");

/*  CREATE ONE USER

*   /////////
*   POST /api/v1/users
*   /////////
*
*   Controlador para crear un nuevo usuario
*
*/

const createOneUser = (req, res, next) => {

    // Cuerpo de la petición POST HTTP
    const { body } = req;

    // Comprobamos que los datos del cuerpo son correctos
    if (!body.username || !body.passwd || !body.email)

        // El cuerpo de la petición no contiene los datos suficientes.
        // Entonces enviamos Código HTTP 400: Bad request
        res.status(400).send({mensaje: "Una usuario debe componerse de: username, passwd, email"});

    else {

        // Creamos un objeto "post" para almacenarlo en la base de datos

        const newUserData = {
            "username":body.username,
            "email":body.email,
            "passwd":body.passwd,
            "circles":[],
        }

        // Llamamos al servicio para que cree el usuario
        const newUser = usersServices.createUser(newUserData);

        if (newUser) {

            res.status(200).send({newUser: newUser, mensaje: `Se ha añadido el usuario ${body.username}`});

        } else {

            // Enviamos una petición HTTP 406: No aceptado
            res.status(406).send({mensaje: "Ha habido un error, usuario no creado - usersController"});

        }

    }

    res.end();

};

/*  GET USERNAME
*
*   //////////
*   GET /api/v1/users/user/:user
*   /////////
*
*   Devuelve el email de un usuario concreto.
*
*   Nota: He dividido los datos en username, email e ID porque no quería devolver
*   en ningún caso la contraseña del usuario y porque además me beneficia en el frontend
*   a la hora de realizar comprobaciones como por ejemplo dar una alerta en un formulario si
*   un usuario existe.
*
*/

const getUsername = (req, res, next) => {

    // Extraemos el parámetro de la URL
    const { user } = req.params;

    // Llamamos al servicio y le enviamos el usuario que hemos extraido de la URL
    const username = usersServices.getUsername(user);

    // Comprobamos que el post existe,
    if (username) {

        // Si hay, lo envío
        res.send(username);

    } else {
        //Si no, se devuelve un código HTTP 200 porque ha hecho una comprobación, pero devuelve falso
        res.status(200).send(false);

    }

    res.end();

};

/*  GET EMAIL
*
*   //////////
*   GET /api/v1/users/email/:email
*   /////////
*
*   Devuelve el email de un usuario concreto.
*
*/

const getEmail = (req, res, next) => {

    // Extraemos el parámetro de la URL
    const { email } = req.params;

    // Llamamos al servicio y le enviamos el usuario que hemos extraido de la URL
    const userEmail = usersServices.getEmail(email);
    console.log(userEmail)

    // Comprobamos que ese email existe,
    if (userEmail) {

        // Si hay, lo envío
        res.send(userEmail);

    } else {
        //Si no, se devuelve un código HTTP 200, por el mismo motivo que el username
        res.status(200).send(false);

    }

    res.end();

};


/*  DELETE ONE POST
*
*   //////////
*   DELETE /api/v1/posts/:id
*   //////////
*
*   Elimina la publicación con el id que se ha pasado por parámetro en la URL
*
*/

const deleteOneUser = (req, res, next) => {

    // Capturamos el Id del usuario
    const { id } = req.params;

    // Llamamos al servicio para que se encargue de eliminar la publicación
    const deletedUser = usersServices.deleteUser(id);

    // Comprobamos si efectivamente se ha borrado
    if (!deletedUser) {

        res.status(404).send({mensaje: "El usuario no se ha eliminado correctamente - usersController"});

    } else {

        res.status(200).send({deletedPost: deletedUser,mensaje: "Usuario borrado"});

    }

    res.end();

};


//TODO Cuando se haga el AUTH ya se mira el actualizar, porque es necesario el ID del user

/* UPDATE ONE POST
*
*   //////////////
*   PUT /api/v1/posts/:id
*   //////////////
*
*   Modifica una publicación dejando intactos los demás datos
*
*/

const updateOneUser = (req, res, next) => {

    // Capturamos el Id del usuario
    const { id } = req.params;

    // Capturamos los nuevos datos del cuerpo de la petición
    const { body } = req;

    // Llamamos al servicio para comprobar que el usuario que queremos actualizar existe
    const exists = usersServices.getUser(id);

    if (exists) {
        // Si existe La actualizamos
        const updatedUser = usersServices.updateUser(id, body);

        if (updatedUser) {

            //Si se actualiza bien, enviamos un código HTTP 200 - Éxito
            res.status(200).send({updatedPost: updatedUser,mensaje: "El usuario se ha modificado con éxito"});

        } else {

            //Si no se ha actualizado bien, enviamos un código HTTP 406 - Not aceptable
            res.status(406).send({mensaje: "Error al actualizar el usuario- usersController"});

        }

    } else {

        //Si el usuario no existe, enviamos un código HTTP 404 - Not Found
        res.status(404).send({mensaje: "El id del usuario enviada no existe - usersController"});

    }

    res.end();

}

function confirmLogin(req, res, next){
    res.status(200).send({mensaje: "Logueado"}).end()
}



module.exports = {
    createOneUser,
    getEmail,
    getUsername,
    updateOneUser,
    deleteOneUser,
    confirmLogin
};
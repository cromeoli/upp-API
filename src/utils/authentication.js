const jwt = require('jsonwebtoken');
const authService = require("../services/authService");

function authManager(req, res, next){
    console.log("En AuthManager")
    //Vemos a ver los datos de la petición
    const { body } = req;

    const userData = {"email": body.email, "passwd": body.passwd}
    const token = req.cookies.auth

    // Si hay usuario y contraseña, los mandamos a loguearse, si no, miramos si hay token
    if(userData){
        if(login(userData)){
            //Creamos el token con los datos del usuario
            const token = createToken(userData);

            // Establecer una cookie con el token JWT
            return res.cookie('auth', token, { httpOnly: true, maxAge: 259200000 })
                    .status(200)
                    .send({mensaje:"Cookie creada con exito"})

        }else{

            if(token == null){
                //Que no hay? A tomar viento del servidor
                return res.status(401).send({mensaje:"No existe token de acceso"});
            }else{
                //Que si? Lo verificamos
                return verifyToken(token) ?
                    next() :
                    res.status(401).send({mensaje: "Token no válido o falta de credenciales"})
            }
        }
    }
}

function login(userData){
    //A ver si los datos existen
    return !!authService.checkUser(userData);
}

function verifyToken(token, req){
    jwt.verify(token, 'matanga', (err, user) => {
        if (err) {
            return false; // El token no es válido
        }

        req.user = user; //TODO DEVOLVER ID????
        // El usuario está autenticado y se puede continuar con la solicitud
    });

    return true;
}

function createToken(user) {
    return jwt.sign(
        {email: user.email, passwd: user.passwd},
        'matanga',
        {expiresIn: '3d'});
}

module.exports = {
    authManager
}
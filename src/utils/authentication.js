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
        console.log("Entro en userdata")
        const userIsVerified = login(userData)
        console.log(userIsVerified)
        console.log(`Resultado de login(userdata): ${login(userData)}`)

        if(!!userIsVerified){
            console.log("El usuario existe, le damos un token")
            //Creamos el token con los datos del usuario
            const token = createToken(userData);

            // Establecer una cookie con el token JWT
            return res.cookie('auth', token, { httpOnly: true, maxAge: 259200000 })
                    .status(200)
                    .send({mensaje:"Logueado con éxito", id:userIsVerified.id})

        }else{
            console.log("No se han encontrado datos de usuario o no son válidos, comprobamos a ver si hay token")
            if(token == null){
                //Que no hay? A tomar viento del servidor
                return res.status(401).send({mensaje:"No existe token de acceso ni credenciales válidas"});
            }else{
                //Que si? Lo verificamos, si es válido seguimos

                jwt.verify(token, 'matanga', (err, user) => {
                    if (err) {
                        return false; // El token no es válido
                    }

                    req.userId = authService.findUserId(user)
                    next()
                    // El usuario está autenticado y se puede continuar con la solicitud
                });
            }

        }
    }

    return res.end()
}

function login(userData){
    //A ver si los datos existen
    return authService.checkUser(userData);
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
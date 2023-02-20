const express = require("express");
const router = express.Router();
const usersController = require("../../controller/usersController")

// http://localhost:3001/api/v1/users/

router.route("/")
    //TODO GetAllUsers para asignar que usuarios están en un círculo
    .post(usersController.createOneUser);


// localhost:3001/api/v1/users/user/:user -> Para comprobar si ese username está en uso
router.route("/user/:user")
    .get(usersController.getUsername)

// localhost:3001/api/v1/users/email/:email -> Para comprobar si ese email está en uso
router.route("/email/:email")
    .get(usersController.getEmail)


module.exports.router = router;
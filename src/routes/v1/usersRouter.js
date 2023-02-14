const express = require("express");
const router = express.Router();
const usersController = require("../../controller/usersController")

// http://localhost:3001/api/v1/posts/

router.route("/")
    //TODO GetAllUsers para asignar que usuarios están en un círculo
    .post(usersController.createOneUser);

// localhost:3001/api/v1/users/:user
router.route("/:id")
    .put(usersController.updateOneUser)
    .delete(usersController.deleteOneUser);

// localhost:3001/api/v1/users/user/:user
router.route("/user/:user")
    .get(usersController.getUsername)

// localhost:3001/api/v1/users/email/:email
router.route("/email/:email")
    .get(usersController.getEmail)


module.exports.router = router;
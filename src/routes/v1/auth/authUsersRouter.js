const express = require("express");
const router = express.Router();
const usersController = require("../../../controller/usersController")

// localhost:3001/api/v1/auth/users/:user
router.route("/:id")
    .put(usersController.updateOneUser)
    .delete(usersController.deleteOneUser);


module.exports.router = router;
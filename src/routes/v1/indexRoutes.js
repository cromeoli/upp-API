const express = require("express");
const router = express.Router();
const postsRoutes = require("./postsRouter");
const usersRoutes = require("./usersRouter");
const authIndexRoutes = require("./auth/authIndexRoutes")
const auth = require("../../utils/authentication")

router.get("/", (req, res, next)=>{
    res.send("Estas en la raíz de las rutas públicas (indexRoutes.js)");
});

router.use("/auth", auth.authManager, authIndexRoutes.router);
router.use("/posts", postsRoutes.router);
router.use("/users", usersRoutes.router);


module.exports.router = router;
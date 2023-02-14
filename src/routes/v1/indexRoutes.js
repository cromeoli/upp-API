const express = require("express");
const router = express.Router();
const postsRoutes = require("./postsRouter");
const usersRoutes = require("./usersRouter");

router.get("/", (req, res, next)=>{
    res.send("Estas en la raíz de las rutas (indexRoutes.js)");
});

router.use("/posts", postsRoutes.router);
router.use("/users", usersRoutes.router);


module.exports.router = router;
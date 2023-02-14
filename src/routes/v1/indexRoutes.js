const express = require("express");
const router = express.Router();
const postsRoutes = require("./postsRouter");

router.get("/", (req, res, next)=>{
    res.send("Estas en la raíz de las rutas (indexRoutes.js)");
});

router.use("/posts", postsRoutes.router);

module.exports.router = router;
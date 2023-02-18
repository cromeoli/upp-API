const express = require("express");
const router = express.Router();
const postsRoutes = require("./authPostsRouter");
const usersRoutes = require("./authUsersRouter");

// http://localhost:3001/api/v1/auth/
router.get("/", (req, res, next)=>{
    res.send("Estas en la raíz de las rutas auth (authIndexRoutes.js)");
});

router.use("/posts", postsRoutes.router);
router.use("/users", usersRoutes.router);


module.exports.router = router;
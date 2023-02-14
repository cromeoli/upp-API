const express = require("express");
const router = express.Router();
const postsController = require("../../controller/postsController")

// http://localhost:3001/api/v1/posts/

router.route("/")
    .get(postsController.getTenPosts)
    .post(postsController.createOnePost);

// localhost:3001/api/v1/posts/:id

router.route("/pagination/:pages")
    .get(postsController.getTenPosts)

router.route("/:id")
    .get(postsController.getOnePost)
    .put(postsController.updateOnePost)
    .delete(postsController.deleteOnePost);

module.exports.router = router;
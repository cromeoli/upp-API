const express = require("express");
const router = express.Router();
const postsController = require("../../controller/postsController")

// http://localhost:3001/api/v1/posts/

router.route("/")
    .get(postsController.getTenPosts)


// localhost:3001/api/v1/posts/pages/:pages
router.route("/pages/:pages")
    .get(postsController.getTenPosts)


// localhost:3001/api/v1/posts/:id
router.route("/:id")
    .get(postsController.getOnePost)

module.exports.router = router;
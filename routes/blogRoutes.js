const express = require("express");
const {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
} = require("../controllers/blogController");
const router = express.Router();

router.get("/blogs", blog_index);

router.post("/blogs", blog_create_post);

router.get("/blog/create", blog_create_get);

router.get("/blogs/:id", blog_details);

router.delete("/blogs/:id", blog_delete);

module.exports = router;

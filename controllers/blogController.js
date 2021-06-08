const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((e) => console.log(e));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => res.render("404", { title: "Blog not found" }));
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create a new Blog" });
};

const blog_create_post = async (req, res) => {
  const blog = new Blog(req.body);

  await blog
    .save()
    .then(() => res.redirect("/blogs"))
    .catch((e) => console.log(e));
  console.log(req.body);
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};

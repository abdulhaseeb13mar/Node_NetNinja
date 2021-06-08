const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const app = express();

//connect to mongodb
const dbURI =
  "mongodb+srv://abdulhaseeb:mongodb123@cluster0.ltgwh.mongodb.net/HaseebBlogs?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(3000);
    console.log("db connected!");
  })
  .catch(() => console.log("db no connected!"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/add-blog", async (req, res) => {
  const blog = new Blog({
    title: "new blog2",
    snippet: "about my new blog2",
    body: "more about my new blog2",
  });
  await blog
    .save()
    .then((result) => res.send(result))
    .catch((e) => console.log(e));
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((e) => console.log(e));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("60bf35c242b92f3b00306c3c")
    .then((result) => res.send(result))
    .catch((e) => console.log(e));
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((e) => console.log(e));
});

app.get("/blog/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

app.use((req, res) => {
  res.render("404", { title: "404" });
});

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
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
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use(blogRoutes);

app.use((req, res) => {
  res.render("404", { title: "404" });
});

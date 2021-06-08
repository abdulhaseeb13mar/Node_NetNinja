const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Hello World",
      snippet:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "Hello World",
      snippet:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "Hello World",
      snippet:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blog/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

app.use((req, res) => {
  res.render("404", { title: "404" });
});

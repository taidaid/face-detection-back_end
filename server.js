const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("Hello");
  next();
});

app.get("/", (req, res) => {
  res.send("getting root");
});

app.get("/profile", (req, res) => {
  res.send("getting profile");
});

app.post("/", (req, res) => {
  const user = {
    name: "Sally",
    hobby: "soccer"
  };
  res.send(user);
});
app.listen(3000);

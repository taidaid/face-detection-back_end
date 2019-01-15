const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();

const db = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: "123",
      email: "john@gmail.com",
      password: "cookies"
    }
  ]
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("root");
  res.send(db.users);
});

// ('/') => res = this is working

// ('/signin') => POST = success/fail
app.post("/signin", (req, res) => {
  console.log("sign in attempt");
  // Load hash from your password DB.
  // bcrypt.compare("bacon", hash, function(err, res) {
  //   // res == true
  // });
  // bcrypt.compare("veggies", hash, function(err, res) {
  //   // res = false
  // });

  if (
    req.body.email === db.users[0].email &&
    req.body.password === db.users[0].password
  ) {
    res.json(db.users[0]);
    console.log("success");
  } else {
    res.status(400).json("error logging in");
    console.log("error logging in");
  }
});

// ('register') => POST = user
app.post("/register", (req, res) => {
  console.log("register");
  const { email, name, password } = req.body;
  // bcrypt.hash(password, null, null, function(err, hash) {
  //   // Store hash in your password DB.
  //   console.log(hash);
  // });
  db.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(db.users[db.users.length - 1]);
  console.log(db.users[db.users.length - 1]);
  console.log("Successful Registration");
});

// ('profile/:userId') => GET = user
app.get("/profile/:id", (req, res) => {
  console.log("get profile");
  const { id } = req.params;
  const user = db.users.filter(user => user.id === id);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json("No such user");
  }
});

// ('image') => PUT = user

app.put("/image", (req, res) => {
  const { id } = req.body;
  const users = db.users.filter(user => user.id === id);
  if (users.length === 1) {
    users[0].entries++;
    return res.json(users[0].entries);
  } else {
    return res.status(404).json("Error finding user");
  }
});

app.listen(3000, () => console.log("app is listening on port 3000"));

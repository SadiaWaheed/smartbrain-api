const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = new knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "1234",
    database: "smart-brain",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

//SIGNIN
app.post("/signin", (req ,res) => {
  signin.handleSignin(req, res, db , bcrypt);
});

//REGISTER
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//PROFILE
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

//IMAGE
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
} );

//IMAGE-API
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
} );

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

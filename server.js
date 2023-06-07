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
    connectionString: process.env.DATABASE_URL,
    ssl: true
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send('it is working');
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

const PORT = process.env.PORT
app.listen(PORT || 3000, () => {
  console.log(`app is running on port ${PORT}`);
});

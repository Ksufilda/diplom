const {
  createProfile,
  createCanvas,
  createUser,
  dropUser,
  dropCanvas,
  dropProfile,
} = require("./queries/tableQueries");

const { setGlobalConn, reciever } = require("./queries/common");
const path = require("path");
const { getProfile, getCanvas } = require("./queries/getData");

const {
  postProfile,
  postCanvas,
  deleteCanvas,
  registerUser,
  loginUser,
} = require("./queries/postData");
const cors = require("cors");
const { Pool } = require("pg");
const express = require(`express`);
const bodyParser = require(`body-parser`);

require("dotenv").config();

const port = process.env.PORT || 5432;
const app = express();
app.use(cors()); // <---- use cors middleware

app.use(bodyParser.json({ limit: `50mb` }));
app.use(bodyParser.urlencoded({ extended: true, limit: `50mb` }));
app.use(express.static(path.resolve(__dirname, "./front/build")));

app.get(`/`, (req, res) => {
  res.sendFile(path.resolve(__dirname, "./front/build", "index.html"));
});

app.get(`/profile/:id`, (req, res) => reciever(req, res, getProfile));
app.get(`/canvas/:id`, (req, res) => reciever(req, res, getCanvas));

app.post(`/profile`, (req, res) => reciever(req, res, postProfile));
app.post(`/canvas`, (req, res) => reciever(req, res, postCanvas));
app.post(`/canvas/:id`, (req, res) => reciever(req, res, deleteCanvas));

app.post(`/register`, (req, res) => reciever(req, res, registerUser));
app.post(`/login`, (req, res) => reciever(req, res, loginUser));

app.listen(port, () => {
  console.log(`Server is running on port `, port);
});

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};
let pool = new Pool(dbConfig);

async function connectToDatabase() {
  console.log("Connecting...");
  setGlobalConn(await pool.connect());
  console.log("Connected!");
  await dropCanvas();
  await dropProfile();
  await dropUser();

  await createUser();
  await createProfile();
  await createCanvas();
}

connectToDatabase();

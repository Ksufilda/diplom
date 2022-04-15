const {
  createOrganizationsTable,
  createHoursTable,
  createMenuTable,
} = require("./queries/tableQueries");

const { setGlobalConn, reciever } = require("./queries/common");
const path = require("path");
const {
  getOrganizationMenu,
  getOrganizationInfo,
  getCoords,
  getAllRows,
  getAllHours,
  getAllMenu,
} = require("./queries/getData");

const { postMenu, postHours, postOrganization } = require("./queries/postData");

const { Pool } = require("pg");
const express = require(`express`);
const bodyParser = require(`body-parser`);

require("dotenv").config();

const port = process.env.PORT || 5432;
const app = express();

app.use(bodyParser.json({ limit: `50mb` }));
app.use(bodyParser.urlencoded({ extended: true, limit: `50mb` }));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get(`/`, (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.get(`/hours`, (req, res) => reciever(req, res, getAllHours));
app.get(`/menu`, (req, res) => reciever(req, res, getAllMenu));

app.get(`/organization/coords`, (req, res) => reciever(req, res, getCoords));
app.get(`/organization/info/:id`, (req, res) =>
  reciever(req, res, getOrganizationInfo)
);
app.get(`/organization/menu/:id`, (req, res) =>
  reciever(req, res, getOrganizationMenu)
);

app.post(`/organization/hours`, (req, res) => reciever(req, res, postHours));
app.post(`/organization/menu`, (req, res) => reciever(req, res, postMenu));
app.post(`/organization`, (req, res) => reciever(req, res, postOrganization));

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

  await createOrganizationsTable();
  await createHoursTable();
  await createMenuTable();
}

connectToDatabase();

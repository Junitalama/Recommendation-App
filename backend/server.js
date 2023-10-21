const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
app.use(cors({ AllowedHeaders: ["Content-Type", "Authorization"] }));
app.use(bodyParser.urlencoded({ extended: false }));

const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});
app.use(bodyParser.json());

app.get("/", (req, res) => {
  
  res.send({ express: "Your Backend Service is Running" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));


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
  db.query("select * from recommendation_cross join recommendation on(recommendation_cross.id = recommendation.rec_id) join users on (recommendation_cross.id = users.user_id) join moods on (recommendation_cross.id = moods.mood_id)")
    .then((result) => res.json(result.rows))
    .catch((err) => res.send(err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

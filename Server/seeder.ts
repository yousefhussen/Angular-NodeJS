const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const users = require("./fake-data/user.FakeData");
const mongoose = require("mongoose");
const User = require("./Schemas/users.schema");
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

mongoose
  .connect(process.env.ATLAS_URI ?? "")
  .then(() => {
    console.log("Database Connected");

    const app = express();
    app.use(cors());

    User.insertMany(users)
      .then((docs) => {
        console.log(`Inserted ${docs.length} users`);
      })
      .catch((err) => {
        console.error(err);
      });
    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));

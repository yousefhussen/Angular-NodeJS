import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./Database";
import { UserRouter } from "./Routes/user.route";
import { BookRouter } from "./Routes/book.route";
import { ImageRouter } from "./Routes/image.route";
import mongoose from "mongoose";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

mongoose.connect(
  process.env.ATLAS_URI??""

);

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use("/Users", UserRouter);
    app.use("/Books", BookRouter);
    app.use("/Images", ImageRouter);

    // Add a middleware function to log every request
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });

    app.get("/pet", (_req, res) => {
      res.send("Hello from MongoDB Atlas!");
    });

    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));

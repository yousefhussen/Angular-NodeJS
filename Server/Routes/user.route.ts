import * as express from "express";
import * as dotenv from "dotenv";
import { ObjectId, UUID } from "mongodb";
import { collections } from "../Database";
import { User } from "../Schemas/users.schema";
import axios from 'axios';
dotenv.config();
import {writeFileSync} from 'fs';
import mongoose from "mongoose";
mongoose.set('debug', true)
export const UserRouter = express.Router();
UserRouter.use(express.json());

UserRouter.use(express.urlencoded({ extended: true }));

UserRouter.get("/", async (_req, res) => {
    try {
        const Users = await collections?.Users?.find({}).toArray();
        res.status(200).send(Users);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

UserRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const User = await collections?.Users?.findOne(query);

        if (User) {
            res.status(200).send(User);
        } else {
            res.status(404).send(`Failed to find an User: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an User: ID ${req?.params?.id}`);
    }
});

UserRouter.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, password, profilePic } = req.body;
        const user = new User( {firstName, lastName, email, password, profilePic });
        console.log(req.body);
        const { BackendServerUrl } = process.env;
        const imageName = await writeImageToDisk(profilePic, email);
        console.log("Done writing image to disk");
        user.profilePic = BackendServerUrl + imageName;
        console.log("Saving user to database");
        user.markModified("polls");
        const result = await user.save();
        console.log("Done saving user to database");
        console.log(result);
        // const result2 = await collections?.Users?.insertOne(user);
        res.status(201).send(result);
      } catch (error: any) {
        if (error instanceof mongoose.Error.ValidationError) {
          res.status(400).send(error.message);
        } else {
          res.status(500).send(error.message);
        }
      }
});

UserRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const User = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.Users?.updateOne(query, { $set: User });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an User: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find an User: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an User: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

UserRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.Users?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an User: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an User: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an User: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});


async function writeImageToDisk(image: string, email: string) {
    const base64String = image;
    const buffer = Buffer.from(base64String, 'base64');
    const fileName = `Images/image${email}.jpg`;
    writeFileSync(fileName, buffer);
    return fileName;
  }
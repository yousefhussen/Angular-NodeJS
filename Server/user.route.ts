import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./Database";

export const UserRouter = express.Router();
UserRouter.use(express.json());

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
        const User = req.body;
        const result = await collections?.Users?.insertOne(User);

        if (result?.acknowledged) {
            console.log(`Created a new User: ID ${result.insertedId}.`);
            res.status(201).send(`Created a new User: ID ${result.insertedId}.`);
        } else {
            console.log("Failed to create a new User.");
            res.status(500).send("Failed to create a new User.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
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
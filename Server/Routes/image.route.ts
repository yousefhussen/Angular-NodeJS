import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../Database";

export const ImageRouter = express.Router();
ImageRouter.use(express.json());

ImageRouter.get("/", async (_req, res) => {
    try {
        const Images = await collections?.Images?.find({}).toArray();
        res.status(200).send(Images);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

ImageRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const Image = await collections?.Images?.findOne(query);

        if (Image) {
            res.status(200).send(Image);
        } else {
            res.status(404).send(`Failed to find an Image: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an Image: ID ${req?.params?.id}`);
    }
});

ImageRouter.get("UserID/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { User: new ObjectId(id) };
        const Image = await collections?.Images?.findOne(query);

        if (Image) {
            res.status(200).send(Image);
        } else {
            res.status(404).send(`Failed to find an Image: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an Image: ID ${req?.params?.id}`);
    }
});

ImageRouter.get("UserID/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { UserID: new ObjectId(id) };
        const Image = await collections?.Images?.findOne(query);

        if (Image) {
            res.status(200).send(Image);
        } else {
            res.status(404).send(`Failed to find an Image: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an Image: ID ${req?.params?.id}`);
    }
});

ImageRouter.get("BookID/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const Image = await collections?.Images?.findOne(query);

        if (Image) {
            res.status(200).send(Image);
        } else {
            res.status(404).send(`Failed to find an Image: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an Image: ID ${req?.params?.id}`);
    }
});


ImageRouter.get("UserID/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const Image = await collections?.Images?.findOne(query);

        if (Image) {
            res.status(200).send(Image);
        } else {
            res.status(404).send(`Failed to find an Image: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an Image: ID ${req?.params?.id}`);
    }
});

ImageRouter.post("/", async (req, res) => {
    try {
        const Image = req.body;
        const result = await collections?.Images?.insertOne(Image);

        if (result?.acknowledged) {
            console.log(`Created a new Image: ID ${result.insertedId}.`);
            res.status(201).send({some:`Created a new Image: ID ${result.insertedId}.`});
        } else {
            console.log("Failed to create a new Image.");
            res.status(500).send("Failed to create a new Image.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

ImageRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const Image = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.Images?.updateOne(query, { $set: Image });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an Image: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find an Image: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an Image: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

ImageRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.Images?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an Image: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an Image: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an Image: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});
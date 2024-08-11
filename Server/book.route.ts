import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./Database";

export const BookRouter = express.Router();
BookRouter.use(express.json());

BookRouter.get("/", async (_req, res) => {
  try {
    const Books = await collections?.Books?.find({}).toArray();
    res.status(200).send(Books);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

BookRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const Book = await collections?.Books?.findOne(query);

    if (Book) {
      res.status(200).send(Book);
    } else {
      res.status(404).send(`Failed to find an Book: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an Book: ID ${req?.params?.id}`);
  }
});

BookRouter.post("/", async (req, res) => {
  try {
    const Book = req.body;
    const result = await collections?.Books?.insertOne(Book);

    if (result?.acknowledged) {
      console.log(`Created a new Book: ID ${result.insertedId}.`);
      console.log(Book);
      res
        .status(201)
        .send({ some: `Created a new Book: ID ${result.insertedId}.` });
    } else {
      console.log("Failed to create a new Book.");
      res.status(500).send("Failed to create a new Book.");
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

BookRouter.put("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const Book = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.Books?.updateOne(query, { $set: Book });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an Book: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an Book: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an Book: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

BookRouter.delete("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.Books?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an Book: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an Book: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an Book: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

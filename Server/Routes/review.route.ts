import * as express from "express";
import { ObjectId } from "mongodb";
import { ReviewModel } from "../Schemas/reviews.schema"

export const ReviewRouter = express.Router();
ReviewRouter.use(express.json());

ReviewRouter.use(express.urlencoded({ extended: true }));

ReviewRouter.get("/", async (_req, res) => {
  try {
    const Reviews = await ReviewModel?.find({});
    res.status(200).send(Reviews);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

ReviewRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const Review = await ReviewModel?.findOne(query);

    if (Review) {
      res.status(200).send(Review);
    } else {
      res.status(404).send(`Failed to find an Review: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an Review: ID ${req?.params?.id}`);
  }
});

ReviewRouter.post("/", async (req, res) => {
  try {
    const { Title, content, Rating, User }  = req.body;
    console.log(req);
    const Review = new ReviewModel({ Title, content, Rating, User });
    const result = await Review.save();

    if (result) {
      console.log(`Created a new Review: ID ${result.id}.`);
      
      res
        .status(201)
        .send({ some: `Created a new Review: ID ${result.id}.` });
    } else {
      console.log("Failed to create a new Review.");
      res.status(500).send("Failed to create a new Review.");
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

ReviewRouter.put("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const Review = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await ReviewModel?.updateOne(query, { $set: Review });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an Review: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an Review: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an Review: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

ReviewRouter.delete("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await ReviewModel?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an Review: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an Review: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an Review: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

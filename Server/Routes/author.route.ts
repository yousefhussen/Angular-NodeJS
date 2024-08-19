import * as express from "express";
import { ObjectId } from "mongodb";
import { Author as AuthorModel } from "../Schemas/authors.schema"
import { writeImageToDisk } from "../helpers/image.helper";

export const AuthorRouter = express.Router();
AuthorRouter.use(express.json());

AuthorRouter.use(express.urlencoded({ extended: true }));

AuthorRouter.get("/", async (_req, res) => {
  try {
    const Authors = await AuthorModel?.find({});
    res.status(200).send(Authors);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

AuthorRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const Author = await AuthorModel?.findOne(query);

    if (Author) {
      res.status(200).send(Author);
    } else {
      res.status(404).send(`Failed to find an Author: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an Author: ID ${req?.params?.id}`);
  }
});

AuthorRouter.post("/", async (req, res) => {
  try {
    const { FirstName, LastName, DateOfBirth, Photo, Books }  = req.body;
    console.log(req);
    const Author = new AuthorModel({ FirstName, LastName, DateOfBirth, Photo, Books });

    Author.Photo = await writeImageToDisk(Author.Photo, Author._id.toString());

    const result = await Author.save();

    if (result) {
      console.log(`Created a new Author: ID ${result.id}.`);
      
      res
        .status(201)
        .send({ some: `Created a new Author: ID ${result.id}.` });
    } else {
      console.log("Failed to create a new Author.");
      res.status(500).send("Failed to create a new Author.");
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

AuthorRouter.patch("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const Author = req.body;
    //if author.photo starts whith http then don't alter it
    if(Author.Photo.startsWith("http")){
      Author.Photo = Author.Photo
    }
    else{
      Author.Photo = await writeImageToDisk(Author.Photo, id);
    }
    
    const query = { _id: new ObjectId(id) };
    const result = await AuthorModel?.updateOne(query, { $set: Author });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an Author: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an Author: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an Author: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

AuthorRouter.delete("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await AuthorModel?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send({ some: `Removed an Author: ID ${id}.` });
    } else if (!result) {
      res.status(400).send({ some: `Failed to remove an Author: ID ${id}.` });
    } else if (!result.deletedCount) {
      res.status(404).send({ some: `Failed to find an Author: ID ${id}.` });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

import * as express from "express";
import { ObjectId } from "mongodb";
import { Category as CategoryModel } from "../Schemas/categories.schema"
import { Book as BookModel } from "../Schemas/books.schema"
export const CategoryRouter = express.Router();
CategoryRouter.use(express.json());

CategoryRouter.use(express.urlencoded({ extended: true }));

CategoryRouter.get("/", async (_req, res) => {
  try {
    const Books = await CategoryModel?.find({});
    res.status(200).send(Books);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

CategoryRouter.get("/:name", async (req, res) => {
  try {
    const name = req?.params?.name;
    const query = { name: name };
    const Category = await CategoryModel?.findOne(query);
    //get the books from the category
    const Books = await BookModel?.find({ category: Category?._id }).populate( "author").exec();

    if (Books) {
      res.status(200).send(Books);
    } else {
      res.status(404).send(`Failed to find Books for category ${name}`);
    }
  } catch (error) {
    console.error(error);
    res.status(404).send(`Failed to find Books for category`);
  }
});

// CategoryRouter.post("/", async (req, res) => {
//   try {
//     const { name, Books}  = req.body;
//     console.log(req);
//     const category = new CategoryModel({ name, Books });
//     const result = await category.save();

//     if (result) {
//       console.log(`Created a new Book: ID ${result.id}.`);
      
//       res
//         .status(201)
//         .send({ some: `Created a new Book: ID ${result.id}.` });
//     } else {
//       console.log("Failed to create a new Book.");
//       res.status(500).send("Failed to create a new Book.");
//     }
//   } catch (error) {
//     console.error(error);
//     res
//       .status(400)
//       .send(error instanceof Error ? error.message : "Unknown error");
//   }
// });

// CategoryRouter.put("/:id", async (req, res) => {
//   try {
//     const id = req?.params?.id;
//     const Book = req.body;
//     const query = { _id: new ObjectId(id) };
//     const result = await CategoryModel?.updateOne(query, { $set: Book });

//     if (result && result.matchedCount) {
//       res.status(200).send(`Updated an Book: ID ${id}.`);
//     } else if (!result?.matchedCount) {
//       res.status(404).send(`Failed to find an Book: ID ${id}`);
//     } else {
//       res.status(304).send(`Failed to update an Book: ID ${id}`);
//     }
//   } catch (error) {
//     const message = error instanceof Error ? error.message : "Unknown error";
//     console.error(message);
//     res.status(400).send(message);
//   }
// });

CategoryRouter.delete("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await CategoryModel?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send({some:`Removed an Book: ID ${id}`});
    } else if (!result) {
      res.status(400).send({some:`Failed to remove an Book: ID ${id}`});
    } else if (!result.deletedCount) {
      res.status(404).send({some:`Failed to find an Book: ID ${id}`});
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

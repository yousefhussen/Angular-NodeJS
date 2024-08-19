import * as express from "express";
import * as mongoose from "mongoose";
import multer from "multer";
import * as fs from "fs";
import pdf from "pdf-parse";
import * as dotenv from "dotenv";
import { Book as BookModel } from "../Schemas/books.schema";
import { ObjectId } from "mongodb";
import { writeImageToDisk } from "../helpers/image.helper";
import path from "path";

dotenv.config();
const FilesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/PDFs");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const ImgaeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/Images/Books");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});


const ImageUpload = multer({
  storage: FilesStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDFs are allowed"));
    }
    cb(null, true);
  },
});

const FileUpload = multer({
  storage: ImgaeStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDFs are allowed"));
    }
    cb(null, true);
  },
});

export const BookRouter = express.Router();
BookRouter.use(express.json());

BookRouter.use(express.urlencoded({ extended: true }));

BookRouter.get("/", async (_req, res) => {
  try {
    const Books = await BookModel.find().populate("author").exec();
    res.status(200).send(Books);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

BookRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const Book = await BookModel?.findOne(query).populate("author").exec();

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
    const { name, CoverPhoto, Year, content, Rating, Reviews, Author } =
      req.body;

    const book = new BookModel({
      name,
      CoverPhoto,
      Year,
      content,
      Rating,
      Reviews,
      Author,
    });
    if (book.CoverPhoto.startsWith("http")) {
      book.CoverPhoto = book.CoverPhoto;
    } else {
      book.CoverPhoto = await writeImageToDisk(book.CoverPhoto, book.id);
    }
    const result = await book.save();

    if (result) {
      console.log(`Created a new Book: ID ${result.id}.`);

      res.status(201).send({ some: `Created a new Book: ID ${result.id}.` });
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
    const result = await BookModel?.updateOne(query, { $set: Book });

    if (result && result.matchedCount) {
      res.status(200).send({ some: `Updated an Book: ID ${id}.`});
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

BookRouter.get('/pdf/:id', (req, res) => {
  const id = req.params.id;
  const pdfPath = path.join(__dirname, 'uploads', 'PDFs', `${id}.pdf`);

  if (fs.existsSync(pdfPath)) {
    res.sendFile(pdfPath);
  } else {
    res.status(404).send('PDF file not found');
  }
});




// Assuming ImageUpload is a middleware for handling file uploads
BookRouter.put("/pdf/:id", async (req, res) => {
  try {
    const id = req?.params?.id;

    // Use ImageUpload middleware to handle the file upload
    ImageUpload.single('file')(req, res, async (error) => {
      if (error) {
        console.error(error);
        return res.status(500).send("File upload error.");
      }

      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const tempPath = req.file.path;
      const targetPath = path.join(__dirname, '..', '..', 'uploads', 'PDFs', `${id}.pdf`);

      // Move the file to the target path and rename it
      fs.rename(tempPath, targetPath, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Failed to save file.");
        }

        const dataBuffer = fs.readFileSync(targetPath);
        try {
          const data = await pdf(dataBuffer);

          // Perform validations on PDF data
          if (data.text.length > 20 * 1024 * 1024) {
            return res.status(400).send("PDF file is too big. Max size is 20MB.");
          }

          const query = { _id: new ObjectId(id) };
          const result = await BookModel?.updateOne(query, {
            $set: { content: process.env.BackendServerUrl + "/Books/pdf/" + id },
          });

          res.status(200).send("File uploaded successfully.");
        } catch (error) {
          console.error(error);
          res.status(500).send("Failed to process PDF.");
        }
      });
    });
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
    const result = await BookModel?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send({ some: `Removed an Book: ID ${id}` });
    } else if (!result) {
      res.status(400).send({ some: `Failed to remove an Book: ID ${id}` });
    } else if (!result.deletedCount) {
      res.status(404).send({ some: `Failed to find an Book: ID ${id}` });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

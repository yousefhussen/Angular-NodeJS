import * as mongoose from "mongoose";
const { MongooseFindByReference } = require("mongoose-find-by-reference");
const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
  Year: {
    type: Date,
    required: true,
  },
  CoverPhoto: {
    type: String,
    required: true,
  },

  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],

  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});
const BookModel = mongoose.model("Book", booksSchema);
export { BookModel as Book, booksSchema };

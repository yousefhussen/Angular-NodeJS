import * as mongoose from "mongoose";
const { MongooseFindByReference } = require("mongoose-find-by-reference");
const authorsSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  DateOfBirth: {
    type: Date,
    required: true,
  },
  Photo: {
    type: String,
    required: true,
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const AuthorModel = mongoose.model("Author", authorsSchema);
export { AuthorModel as Author, authorsSchema };

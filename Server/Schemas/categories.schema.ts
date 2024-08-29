import * as mongoose from "mongoose";
const { MongooseFindByReference } = require("mongoose-find-by-reference");
const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },

  Books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});
categoriesSchema.plugin(MongooseFindByReference);
const CategoryModel = mongoose.model("Category", categoriesSchema);
export { CategoryModel as Category, categoriesSchema };

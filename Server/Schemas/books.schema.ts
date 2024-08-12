import * as mongoose from "mongoose";
const { MongooseFindByReference } = require('mongoose-find-by-reference');
const booksSchema = new mongoose.Schema({
  _id: {},
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
    required: true,},

  Reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
 

  Author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },

});
booksSchema.plugin(MongooseFindByReference);
const BookModel = mongoose.model('Image', booksSchema);
export {
    BookModel,
    booksSchema 
 };

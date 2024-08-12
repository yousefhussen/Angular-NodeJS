import * as mongoose from "mongoose";
const { MongooseFindByReference } = require('mongoose-find-by-reference');
const imagesSchema = new mongoose.Schema({
  _id: {},
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  Author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },

});
imagesSchema.plugin(MongooseFindByReference);
const ImageModel = mongoose.model('image', imagesSchema);
export {
  ImageModel,
    imagesSchema 
 };

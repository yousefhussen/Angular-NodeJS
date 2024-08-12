import * as mongoose from "mongoose";
const { MongooseFindByReference } = require('mongoose-find-by-reference');
const reviewsSchema = new mongoose.Schema({
  _id: {},
  Title: {
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

    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 


});
reviewsSchema.plugin(MongooseFindByReference);
const ReviewModel = mongoose.model('Review', reviewsSchema);
export {
    ReviewModel,
    reviewsSchema 
 };

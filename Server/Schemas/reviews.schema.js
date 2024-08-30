"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsSchema = exports.ReviewModel = void 0;
var mongoose = require("mongoose");
var MongooseFindByReference = require('mongoose-find-by-reference').MongooseFindByReference;
var reviewsSchema = new mongoose.Schema({
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
        required: true,
    },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
exports.reviewsSchema = reviewsSchema;
reviewsSchema.plugin(MongooseFindByReference);
var ReviewModel = mongoose.model('Review', reviewsSchema);
exports.ReviewModel = ReviewModel;

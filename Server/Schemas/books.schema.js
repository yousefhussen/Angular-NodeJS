"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksSchema = exports.Book = void 0;
var mongoose = require("mongoose");
var MongooseFindByReference = require("mongoose-find-by-reference").MongooseFindByReference;
var booksSchema = new mongoose.Schema({
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
    Reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    Author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    Category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});
exports.booksSchema = booksSchema;
booksSchema.plugin(MongooseFindByReference);
var BookModel = mongoose.model("Book", booksSchema);
exports.Book = BookModel;

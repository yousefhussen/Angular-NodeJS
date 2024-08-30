"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksSchema = exports.Book = void 0;
var mongoose = require("mongoose");
var MongooseFindByReference = require("mongoose-find-by-reference").MongooseFindByReference;
var dateFormat = require("../helpers/dateNotTime.helper").dateFormat;
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
        set: dateFormat,
        get: dateFormat,
    },
    CoverPhoto: {
        type: String,
        required: true,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});
exports.booksSchema = booksSchema;
var BookModel = mongoose.model("Book", booksSchema);
exports.Book = BookModel;

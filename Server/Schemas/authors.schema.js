"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorsSchema = exports.Author = void 0;
var mongoose = require("mongoose");
var MongooseFindByReference = require("mongoose-find-by-reference").MongooseFindByReference;
var dateFormat = require("../helpers/dateNotTime.helper").dateFormat;
var authorsSchema = new mongoose.Schema({
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
        set: dateFormat,
        get: dateFormat,
    },
    Photo: {
        type: String,
        required: true,
    },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});
exports.authorsSchema = authorsSchema;
var AuthorModel = mongoose.model("Author", authorsSchema);
exports.Author = AuthorModel;

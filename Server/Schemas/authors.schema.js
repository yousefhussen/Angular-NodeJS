"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorsSchema = exports.Author = void 0;
var mongoose = require("mongoose");
var MongooseFindByReference = require("mongoose-find-by-reference").MongooseFindByReference;
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
    },
    Photo: {
        type: String,
        required: true,
    },
    Books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});
exports.authorsSchema = authorsSchema;
authorsSchema.plugin(MongooseFindByReference);
var AuthorModel = mongoose.model("Author", authorsSchema);
exports.Author = AuthorModel;

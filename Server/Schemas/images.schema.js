"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesSchema = exports.ImageModel = void 0;
var mongoose = require("mongoose");
var MongooseFindByReference = require("mongoose-find-by-reference").MongooseFindByReference;
var imagesSchema = new mongoose.Schema({
    _id: {},
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    Author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
});
exports.imagesSchema = imagesSchema;
imagesSchema.plugin(MongooseFindByReference);
var ImageModel = mongoose.model("image", imagesSchema);
exports.ImageModel = ImageModel;

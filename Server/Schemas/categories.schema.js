"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesSchema = exports.Category = void 0;
var mongoose = require("mongoose");
var MongooseFindByReference = require("mongoose-find-by-reference").MongooseFindByReference;
var categoriesSchema = new mongoose.Schema({
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
exports.categoriesSchema = categoriesSchema;
categoriesSchema.plugin(MongooseFindByReference);
var CategoryModel = mongoose.model("Category", categoriesSchema);
exports.Category = CategoryModel;

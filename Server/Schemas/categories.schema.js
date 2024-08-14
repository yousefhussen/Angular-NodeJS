"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesSchema = exports.Category = void 0;
var mongoose = require("mongoose");
var mongoose_find_by_reference_1 = require("mongoose-find-by-reference");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorsSchema = exports.Author = void 0;
var categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    Books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});
exports.categoriesSchema = categoriesSchema;
categoriesSchema.plugin(mongoose_find_by_reference_1.MongooseFindByReference);
var CategoryModel = mongoose.model("Category", categoriesSchema);
exports.Category = CategoryModel;

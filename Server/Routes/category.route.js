"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
var express = require("express");
var mongodb_1 = require("mongodb");
var categories_schema_1 = require("../Schemas/categories.schema");
var books_schema_1 = require("../Schemas/books.schema");
exports.CategoryRouter = express.Router();
exports.CategoryRouter.use(express.json());
exports.CategoryRouter.use(express.urlencoded({ extended: true }));
exports.CategoryRouter.get("/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Books, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (categories_schema_1.Category === null || categories_schema_1.Category === void 0 ? void 0 : categories_schema_1.Category.find({}))];
            case 1:
                Books = _a.sent();
                res.status(200).send(Books);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res
                    .status(500)
                    .send(error_1 instanceof Error ? error_1.message : "Unknown error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.CategoryRouter.get("/:name", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, query, Category, Books, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                name_1 = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.name;
                query = { name: name_1 };
                return [4 /*yield*/, (categories_schema_1.Category === null || categories_schema_1.Category === void 0 ? void 0 : categories_schema_1.Category.findOne(query))];
            case 1:
                Category = _b.sent();
                return [4 /*yield*/, (books_schema_1.Book === null || books_schema_1.Book === void 0 ? void 0 : books_schema_1.Book.find({ category: Category === null || Category === void 0 ? void 0 : Category._id }).populate("author").exec())];
            case 2:
                Books = _b.sent();
                if (Books) {
                    res.status(200).send(Books);
                }
                else {
                    res.status(404).send("Failed to find Books for category ".concat(name_1));
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(404).send("Failed to find Books for category");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// CategoryRouter.post("/", async (req, res) => {
//   try {
//     const { name, Books}  = req.body;
//     console.log(req);
//     const category = new CategoryModel({ name, Books });
//     const result = await category.save();
//     if (result) {
//       console.log(`Created a new Book: ID ${result.id}.`);
//       res
//         .status(201)
//         .send({ some: `Created a new Book: ID ${result.id}.` });
//     } else {
//       console.log("Failed to create a new Book.");
//       res.status(500).send("Failed to create a new Book.");
//     }
//   } catch (error) {
//     console.error(error);
//     res
//       .status(400)
//       .send(error instanceof Error ? error.message : "Unknown error");
//   }
// });
// CategoryRouter.put("/:id", async (req, res) => {
//   try {
//     const id = req?.params?.id;
//     const Book = req.body;
//     const query = { _id: new ObjectId(id) };
//     const result = await CategoryModel?.updateOne(query, { $set: Book });
//     if (result && result.matchedCount) {
//       res.status(200).send(`Updated an Book: ID ${id}.`);
//     } else if (!result?.matchedCount) {
//       res.status(404).send(`Failed to find an Book: ID ${id}`);
//     } else {
//       res.status(304).send(`Failed to update an Book: ID ${id}`);
//     }
//   } catch (error) {
//     const message = error instanceof Error ? error.message : "Unknown error";
//     console.error(message);
//     res.status(400).send(message);
//   }
// });
exports.CategoryRouter.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, result, error_3, message;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                query = { _id: new mongodb_1.ObjectId(id) };
                return [4 /*yield*/, (categories_schema_1.Category === null || categories_schema_1.Category === void 0 ? void 0 : categories_schema_1.Category.deleteOne(query))];
            case 1:
                result = _b.sent();
                if (result && result.deletedCount) {
                    res.status(202).send({ some: "Removed an Book: ID ".concat(id) });
                }
                else if (!result) {
                    res.status(400).send({ some: "Failed to remove an Book: ID ".concat(id) });
                }
                else if (!result.deletedCount) {
                    res.status(404).send({ some: "Failed to find an Book: ID ".concat(id) });
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                message = error_3 instanceof Error ? error_3.message : "Unknown error";
                console.error(message);
                res.status(400).send(message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });

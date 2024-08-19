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
var mongodb_1 = require("mongodb");
var faker = require("@faker-js/faker").faker;
var User = require("./Schemas/users.schema").User;
var Author = require("./Schemas/authors.schema").Author;
var Book = require("./Schemas/books.schema").Book;
var Category = require("./Schemas/categories.schema").Category;
var generateAuthors = require("./fake-data/author.FakeData").generateAuthors;
var generateUsers = require("./fake-data/user.FakeData").generateUsers;
var generateBooks = require("./fake-data/book.FakeData").generateBooks;
var generateCategories = require("./fake-data/category.FakeData").generateCategories;
var mongoose = require("mongoose");
var Seeder = /** @class */ (function () {
    function Seeder() {
        var _this = this;
        this.Objects = {
            Author: [],
            User: [],
            Book: [],
            Category: [],
        };
        var connectDB = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, mongoose.connect("mongodb://localhost:27017/GoodReads")];
                    case 1:
                        _a.sent();
                        console.log("connected to db");
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        connectDB();
    }
    Seeder.prototype.GenerateFakeData = function (model, num) {
        return __awaiter(this, void 0, void 0, function () {
            var generators, generator, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        generators = {
                            Author: generateAuthors,
                            User: generateUsers,
                            Book: generateBooks,
                            Category: generateCategories,
                        };
                        generator = generators["".concat(model.modelName)];
                        if (!generator) {
                            console.error("No generator found for model: ".concat(model.modelName));
                            return [2 /*return*/];
                        }
                        data = generator(num);
                        return [4 /*yield*/, model
                                .insertMany(data)
                                .then(function (docs) {
                                _this.Objects[model.modelName] = docs;
                                console.log("".concat(docs.length, " ").concat(model.modelName, " have been inserted into the database."));
                                console.log(_this.Objects[model.modelName]);
                            })
                                .catch(function (err) {
                                var _a, _b;
                                console.error(err);
                                console.error("".concat((_b = (_a = err.writeErrors) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0, " errors occurred during the insertMany operation."));
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Seeder.prototype.FillRefrrences = function (model, FieldToBeFilled, data, referenceData) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, referencePaths, savePromises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = model.schema;
                        referencePaths = Object.keys(schema.paths).filter(function (path) { return path === FieldToBeFilled; });
                        console.log(referenceData);
                        savePromises = data.map(function (doc, index) {
                            // Loop through each path where the field needs to be filled
                            referencePaths.forEach(function (referencePath) {
                                // Get the reference ID from the reference data
                                console.log(referenceData[index]._id);
                                console.log(typeof referenceData[index]._id);
                                var referenceId = new mongodb_1.ObjectId(referenceData[index]._id);
                                // Set the reference ID in the document
                                doc[referencePath] = referenceId;
                            });
                            // Return the save promise
                            return doc.save();
                        });
                        // Wait for all save operations to complete
                        return [4 /*yield*/, Promise.all(savePromises)];
                    case 1:
                        // Wait for all save operations to complete
                        _a.sent();
                        console.log("".concat(data.length, " ").concat(model.modelName, " have been filled with reference data."));
                        return [2 /*return*/];
                }
            });
        });
    };
    Seeder.prototype.EndConnection = function () {
        mongoose.connection.close();
    };
    return Seeder;
}());
var SeederOvbject = new Seeder();
function AllInOrder() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, SeederOvbject.GenerateFakeData(Book, 1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, SeederOvbject.GenerateFakeData(Author, 10)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, SeederOvbject.FillRefrrences(Book, "author", SeederOvbject.Objects.Book, SeederOvbject.Objects.Author)];
                case 3:
                    _a.sent();
                    SeederOvbject.EndConnection();
                    return [2 /*return*/];
            }
        });
    });
}
AllInOrder();
//end connection and  exit

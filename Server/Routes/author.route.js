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
exports.AuthorRouter = void 0;
var express = require("express");
var mongodb_1 = require("mongodb");
var authors_schema_1 = require("../Schemas/authors.schema");
var multer = require("multer");
var fs = require("fs");
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var path = require("path");
dotenv.config();
var FilesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Uploads Path: ", path.join(__dirname, "..", "uploads", "Authors"));
        var fieldname = file.fieldname;
        var dir = "./uploads/Authors/".concat(fieldname, "s");
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        var _a;
        var bookId = (_a = req.params.id) !== null && _a !== void 0 ? _a : req.body.id;
        if (!bookId) {
            bookId = new mongoose.Types.ObjectId().toString();
            req.body.id = bookId;
        }
        var fileExtension = file.originalname.split('.').pop();
        cb(null, "".concat(bookId, ".").concat(fileExtension));
    },
});
var fileFilter = function (req, file, cb) {
    if (file.fieldname === 'image' && !file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({
    storage: FilesStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});
var fields = [
    { name: 'image', maxCount: 1 },
];
var uploadFields = upload.fields(fields);
exports.AuthorRouter = express.Router();
exports.AuthorRouter.use(express.json());
exports.AuthorRouter.use(express.urlencoded({ extended: true }));
exports.AuthorRouter.get("/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Authors, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (authors_schema_1.Author === null || authors_schema_1.Author === void 0 ? void 0 : authors_schema_1.Author.find({}))];
            case 1:
                Authors = _a.sent();
                res.status(200).send(Authors);
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
exports.AuthorRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, Author, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                query = { _id: new mongodb_1.ObjectId(id) };
                return [4 /*yield*/, (authors_schema_1.Author === null || authors_schema_1.Author === void 0 ? void 0 : authors_schema_1.Author.findOne(query))];
            case 1:
                Author = _c.sent();
                if (Author) {
                    res.status(200).send(Author);
                }
                else {
                    res.status(404).send("Failed to find an Author: ID ".concat(id));
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _c.sent();
                res.status(404).send("Failed to find an Author: ID ".concat((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.AuthorRouter.get('/image/:id', function (req, res) {
    var id = req.params.id;
    var imageDir = path.join(__dirname, "..", 'uploads', 'Authors', 'images');
    var extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
        var ext = extensions_1[_i];
        var imagePath = path.join(imageDir, "".concat(id).concat(ext));
        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
            return;
        }
    }
    res.status(404).send('Image file not found');
});
exports.AuthorRouter.post("/", uploadFields, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, FirstName, LastName, DateOfBirth, Photo, Books, Author, files_1, imageNames, result, error_3;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = JSON.parse(req.body.Author), FirstName = _a.FirstName, LastName = _a.LastName, DateOfBirth = _a.DateOfBirth, Photo = _a.Photo, Books = _a.Books;
                Author = new authors_schema_1.Author({ _id: (_b = req.body.id) !== null && _b !== void 0 ? _b : new mongodb_1.ObjectId(), FirstName: FirstName, LastName: LastName, DateOfBirth: DateOfBirth, Photo: Photo, Books: Books });
                if (req === null || req === void 0 ? void 0 : req.files) {
                    files_1 = req.files;
                    imageNames = Object.keys(files_1).map(function (key) { return files_1['image'][0].filename; });
                    Author.Photo = process.env.BackendServerUrl + 'Authors' + '/image/' + Author._id;
                }
                return [4 /*yield*/, Author.save()];
            case 1:
                result = _c.sent();
                if (result) {
                    console.log("Created a new Author: ID ".concat(result.id, "."));
                    res
                        .status(201)
                        .send({ some: "Created a new Author: ID ".concat(result.id, ".") });
                }
                else {
                    console.log("Failed to create a new Author.");
                    res.status(500).send("Failed to create a new Author.");
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _c.sent();
                console.error(error_3);
                res
                    .status(400)
                    .send(error_3 instanceof Error ? error_3.message : "Unknown error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.AuthorRouter.put("/:id", uploadFields, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Author, files_2, imageNames, query, result, error_4, message;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                Author = JSON.parse(req.body.Author);
                if (req === null || req === void 0 ? void 0 : req.files) {
                    files_2 = req.files;
                    console.log("files --------------------------------------------------", files_2);
                    imageNames = Object.keys(files_2).map(function (key) { return files_2['image'][0].filename; });
                    Author.Photo = process.env.BackendServerUrl + 'Authors' + '/image/' + id;
                    // console.log("Book['CoverPhoto'] --------------------------------------------------",Book['CoverPhoto']);
                }
                query = { _id: new mongodb_1.ObjectId(id) };
                return [4 /*yield*/, (authors_schema_1.Author === null || authors_schema_1.Author === void 0 ? void 0 : authors_schema_1.Author.updateOne(query, { $set: Author }))];
            case 1:
                result = _b.sent();
                if (result && result.matchedCount) {
                    res.status(200).send({ some: "Updated an Author: ID ".concat(id, ".") });
                }
                else if (!(result === null || result === void 0 ? void 0 : result.matchedCount)) {
                    res.status(404).send({ some: "Failed to find an Author: ID ".concat(id) });
                }
                else {
                    res.status(304).send({ some: "Failed to update an Author: ID ".concat(id) });
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                message = error_4 instanceof Error ? error_4.message : "Unknown error";
                console.error(error_4);
                res.status(400).send(message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.AuthorRouter.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, result, error_5, message;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                query = { _id: new mongodb_1.ObjectId(id) };
                return [4 /*yield*/, (authors_schema_1.Author === null || authors_schema_1.Author === void 0 ? void 0 : authors_schema_1.Author.deleteOne(query))];
            case 1:
                result = _b.sent();
                if (result && result.deletedCount) {
                    res.status(202).send({ some: "Removed an Author: ID ".concat(id, ".") });
                }
                else if (!result) {
                    res.status(400).send({ some: "Failed to remove an Author: ID ".concat(id, ".") });
                }
                else if (!result.deletedCount) {
                    res.status(404).send({ some: "Failed to find an Author: ID ".concat(id, ".") });
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                message = error_5 instanceof Error ? error_5.message : "Unknown error";
                console.error(message);
                res.status(400).send(message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });

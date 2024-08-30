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
exports.UserRouter = void 0;
var express = require("express");
var dotenv = require("dotenv");
var mongodb_1 = require("mongodb");
var users_schema_1 = require("../Schemas/users.schema");
var image_helper_1 = require("../helpers/image.helper");
var Joi = require("joi");
var jwt = require("jsonwebtoken");
dotenv.config();
var mongoose_1 = require("mongoose");
// import { generateAuthToken } from 'auth';
mongoose_1.default.set("debug", true);
exports.UserRouter = express.Router();
exports.UserRouter.use(express.json());
exports.UserRouter.use(express.urlencoded({ extended: true }));
exports.UserRouter.post("/login/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, User, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = _req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, users_schema_1.User.findOne({ email: email, password: password })];
            case 1:
                User = _b.sent();
                // const User = await MUser.findOne({});
                if (User !== null) {
                    token = jwt.sign({ userId: User._id }, "key", {
                        expiresIn: "1h",
                    });
                    //exclude password from response
                    User.password = "";
                    res.status(200).json({ token: token, User: User });
                }
                else {
                    res.status(404).send("Failed to find an User: email ".concat(email));
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res
                    .status(500)
                    .send(error_1 instanceof Error ? error_1.message : "Unknown error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.UserRouter.get("/ForgetPassword/:email", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var User, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users_schema_1.User.findOne({ email: _req.params.email })];
            case 1:
                User = _a.sent();
                if (User === null) {
                    res.status(404).send("Failed to find an User: ID ".concat(_req.params.email));
                }
                else {
                    res.status(200).send(User);
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res
                    .status(500)
                    .send(error_2 instanceof Error ? error_2.message : "Unknown error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.UserRouter.post("/reset-password/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, User, result, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = _req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, users_schema_1.User.findOne({ email: email })];
            case 1:
                User = _b.sent();
                if (!(User === null)) return [3 /*break*/, 2];
                res.status(404).send("Failed to find an User: email ".concat(email));
                return [3 /*break*/, 4];
            case 2:
                User.password = password;
                return [4 /*yield*/, User.save()];
            case 3:
                result = _b.sent();
                res.status(200).send(result);
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                res
                    .status(500)
                    .send(error_3 instanceof Error ? error_3.message : "Unknown error");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.UserRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, User, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                query = { _id: new mongodb_1.ObjectId(id) };
                return [4 /*yield*/, users_schema_1.User.findOne(query)];
            case 1:
                User = _c.sent();
                if (User) {
                    res.status(200).send(User);
                }
                else {
                    res.status(404).send("Failed to find an User: ID ".concat(id));
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _c.sent();
                res.status(404).send("Failed to find an User: ID ".concat((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.UserRouter.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, password, profilePic, user, _b, result, token, error_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, profilePic = _a.profilePic;
                user = new users_schema_1.User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    profilePic: profilePic,
                });
                _b = user;
                return [4 /*yield*/, (0, image_helper_1.writeImageToDisk)(profilePic, user.id)];
            case 1:
                _b.profilePic = _c.sent();
                return [4 /*yield*/, user.save()];
            case 2:
                result = _c.sent();
                token = jwt.sign({ userId: user._id }, "key", {
                    expiresIn: "1h",
                });
                res.status(200).json({ token: token, user: user });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _c.sent();
                if (error_5 instanceof mongoose_1.default.Error.ValidationError) {
                    res.status(400).send(error_5.message);
                }
                else {
                    res.status(500).send(error_5.message);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.UserRouter.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, User, _a, query, result, error_6, message;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
                User = req.body;
                _a = User;
                return [4 /*yield*/, (0, image_helper_1.writeImageToDisk)(User.profilePic, id)];
            case 1:
                _a.profilePic = _c.sent();
                query = { _id: new mongodb_1.ObjectId(id) };
                return [4 /*yield*/, (users_schema_1.User === null || users_schema_1.User === void 0 ? void 0 : users_schema_1.User.updateOne(query, { $set: User }))];
            case 2:
                result = _c.sent();
                if (result && result.matchedCount) {
                    res.status(200).send({ message: "Updated an User: ID ".concat(id, ".") });
                }
                else if (!(result === null || result === void 0 ? void 0 : result.matchedCount)) {
                    res.status(404).send({ message: "Failed to find an User: ID ".concat(id) });
                }
                else {
                    res.status(304).send({ message: "Failed to update an User: ID ".concat(id) });
                }
                return [3 /*break*/, 4];
            case 3:
                error_6 = _c.sent();
                message = error_6 instanceof Error ? error_6.message : "Unknown error";
                console.error(message);
                res.status(400).send(message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.UserRouter.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    function validateUser(User) {
        var schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            profilePic: Joi.string().required(),
            password: Joi.string()
                .required()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        });
        return User;
    }
    function validateBook(Book) {
        var schema = Joi.object({
            title: Joi.string().min(5).max(50).required(),
            author: Joi.string().required(),
            genre: Joi.string().required(),
            image: Joi.string().required(),
        });
        return Book;
    }
    function validateAuthor(Author) {
        var schema = Joi.object({
            name: Joi.string().min(5).max(50).required(),
            image: Joi.string().required(),
        });
        return Author;
    }
    function validateBookEdit(Book) {
        var schema = Joi.object({
            title: Joi.string().min(5).max(50),
            author: Joi.string(),
            genre: Joi.string(),
            image: Joi.string(),
        });
        return Book;
    }
    function validateAuthorEdit(Author) {
        var schema = Joi.object({
            name: Joi.string().min(5).max(50),
            image: Joi.string(),
        });
        return Author;
    }
    var id, query, result, error_7, message;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                query = { _id: new mongodb_1.ObjectId(id) };
                return [4 /*yield*/, (users_schema_1.User === null || users_schema_1.User === void 0 ? void 0 : users_schema_1.User.deleteOne(query))];
            case 1:
                result = _b.sent();
                if (result && result.deletedCount) {
                    res.status(202).send("Removed an User: ID ".concat(id));
                }
                else if (!result) {
                    res.status(400).send("Failed to remove an User: ID ".concat(id));
                }
                else if (!result.deletedCount) {
                    res.status(404).send("Failed to find an User: ID ".concat(id));
                }
                return [3 /*break*/, 3];
            case 2:
                error_7 = _b.sent();
                message = error_7 instanceof Error ? error_7.message : "Unknown error";
                console.error(message);
                res.status(400).send(message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// module.exports = 
// {
//   validateUser,
//   validateBook,
//   validateAuthor,
//   validateBookEdit,
//   validateAuthorEdit,
// }

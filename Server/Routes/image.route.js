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
exports.ImageRouter = void 0;
var express = require("express");
var mongodb_1 = require("mongodb");
var images_schema_1 = require("../Schemas/images.schema");
var path = require("path");
exports.ImageRouter = express.Router();
exports.ImageRouter.use(express.json());
exports.ImageRouter.use(express.urlencoded({ extended: true }));
exports.ImageRouter.get("/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Images, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (images_schema_1.ImageModel === null || images_schema_1.ImageModel === void 0 ? void 0 : images_schema_1.ImageModel.find({}))];
            case 1:
                Images = _a.sent();
                res.status(200).send(Images);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).send(error_1 instanceof Error ? error_1.message : "Unknown error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.ImageRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, Image_1, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                query = { _id: new mongodb_1.ObjectId(id) };
                return [4 /*yield*/, (images_schema_1.ImageModel === null || images_schema_1.ImageModel === void 0 ? void 0 : images_schema_1.ImageModel.findOne(query))];
            case 1:
                Image_1 = _c.sent();
                if (Image_1) {
                    res.status(200).send(Image_1);
                }
                else {
                    res.status(404).send("essefesfefsFailed to find an Image: ID ".concat(id));
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _c.sent();
                res.status(404).send("wadwdawadFailed to find an Image: ID ".concat((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.ImageRouter.get("/User/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, imagePath;
    var _a;
    return __generator(this, function (_b) {
        try {
            filename = req.params.id + ".jpg";
            imagePath = path.join(__dirname, "../Images/User", filename);
            res.sendFile(imagePath);
        }
        catch (error) {
            res.status(404).send("Failed to find an Image: ID ".concat((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id));
        }
        return [2 /*return*/];
    });
}); });
exports.ImageRouter.get("/BookID/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, Image_2, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                query = { _id: new mongodb_1.ObjectId(id) };
                return [4 /*yield*/, (images_schema_1.ImageModel === null || images_schema_1.ImageModel === void 0 ? void 0 : images_schema_1.ImageModel.findOne(query))];
            case 1:
                Image_2 = _c.sent();
                if (Image_2) {
                    res.status(200).send(Image_2);
                }
                else {
                    res.status(404).send("Failed to find an Image: ID ".concat(id));
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _c.sent();
                res.status(404).send("Failed to find an Image: ID ".concat((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.ImageRouter.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Can't Post Imgaes");
        res.status(500).send({ some: "Can't Post Images" });
        return [2 /*return*/];
    });
}); });
exports.ImageRouter.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Image_3, query, result, error_4, message;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                Image_3 = req.body;
                query = { _id: new mongodb_1.ObjectId(id) };
                return [4 /*yield*/, (images_schema_1.ImageModel === null || images_schema_1.ImageModel === void 0 ? void 0 : images_schema_1.ImageModel.updateOne(query, { $set: Image_3 }))];
            case 1:
                result = _b.sent();
                if (result && result.matchedCount) {
                    res.status(200).send("Updated an Image: ID ".concat(id, "."));
                }
                else if (!(result === null || result === void 0 ? void 0 : result.matchedCount)) {
                    res.status(404).send("Failed to find an Image: ID ".concat(id));
                }
                else {
                    res.status(304).send("Failed to update an Image: ID ".concat(id));
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                message = error_4 instanceof Error ? error_4.message : "Unknown error";
                console.error(message);
                res.status(400).send(message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.ImageRouter.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, result, error_5, message;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                query = { _id: new mongodb_1.ObjectId(id) };
                return [4 /*yield*/, (images_schema_1.ImageModel === null || images_schema_1.ImageModel === void 0 ? void 0 : images_schema_1.ImageModel.deleteOne(query))];
            case 1:
                result = _b.sent();
                if (result && result.deletedCount) {
                    res.status(202).send("Removed an Image: ID ".concat(id));
                }
                else if (!result) {
                    res.status(400).send("Failed to remove an Image: ID ".concat(id));
                }
                else if (!result.deletedCount) {
                    res.status(404).send("Failed to find an Image: ID ".concat(id));
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersSchema = exports.User = void 0;
var mongoose = require("mongoose");
var usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    profilePic: String,
});
exports.usersSchema = usersSchema;
var User = mongoose.model("User", usersSchema);
exports.User = User;

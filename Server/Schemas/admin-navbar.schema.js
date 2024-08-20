"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorsSchema = exports.Author = void 0;
var mongoose = require("mongoose");
var MongooseFindByReference =
  require("mongoose-find-by-reference").MongooseFindByReference;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminRouter = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
adminRouter.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Admin = mongoose.model("Admin", adminRouter);

module.exports = Admin;

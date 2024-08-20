import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


// Hash password before saving
AdminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });


export const Admin = mongoose.model("Admin", AdminSchema);



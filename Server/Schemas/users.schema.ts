import * as mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    profilePic: String,
  });
  const User = mongoose.model("User", usersSchema);

  export { User };
export {
    usersSchema
 };

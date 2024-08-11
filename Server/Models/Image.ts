import * as mongodb from "mongodb";
import { User } from "../Models/User";
import { Book } from "../Models/Book";
// import { Author } from "../Models/Author";

export interface Image {
  _id?: mongodb.ObjectId;
  name: string;
  path: string;
  type: string;
  User
  Book
//   Author

  
}

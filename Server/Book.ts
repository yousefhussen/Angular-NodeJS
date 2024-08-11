import * as mongodb from "mongodb";

export interface Book {
  _id?: mongodb.ObjectId;
  Name: string;
  AuthName: string;
  Rating: number;
  category: string;
  profilePic: string;
}

"use strict";
// import * as mongodb from "mongodb";
// import { usersSchema , User  } from "./Schemas/users.schema";
// // export const collections: {
// //   Users?: mongodb.Collection<User>;
// //   Books?: mongodb.Collection<Book>;
// //   Images?: mongodb.Collection<Image>;
// // } = {};
// export async function connectToDatabase(uri: string) {
//   const client = new mongodb.MongoClient(uri);
//   await client.connect();
//   const db = client.db("GoodReads");
//   await applySchemaValidation(db);
//   const UsersCollection = db.collection<User>("Users");
//   collections.Users = UsersCollection;
//   const BooksCollection = db.collection<Book>("Books");
//   collections.Books = BooksCollection;
//   const ImagesCollection = db.collection<Image>("Images");
//   collections.Images = ImagesCollection;
// }
// async function applySchemaValidation(db: mongodb.Db) {
//   await db
//     .command({
//       collMod: "Users",
//     })
//     .catch(async (error: mongodb.MongoServerError) => {
//       if (error.codeName === "NamespaceNotFound") {
//         await db.createCollection("Users", { validator: usersSchema });
//       } else {
//         console.log("wwwwwwwwddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww:", error);
//         console.error("Validation error:", error);
//       }
//     });
//   await db
//     .command({
//       collMod: "Books",
//     })
//     .catch(async (error: mongodb.MongoServerError) => {
//       if (error.codeName === "NamespaceNotFound") {
//         await db.createCollection("Books");
//       } else {
//         console.error("Validation error:", error);
//       }
//     });
//   await db
//     .command({
//       collMod: "Images",
//     })
//     .catch(async (error: mongodb.MongoServerError) => {
//       if (error.codeName === "NamespaceNotFound") {
//         await db.createCollection("Images");
//       } else {
//         console.error("Validation error:", error);
//       }
//     });
// }

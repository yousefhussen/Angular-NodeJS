import * as mongodb from "mongodb";
import { User } from "./User";
import { Book } from "./Book";

export const collections: {
  Users?: mongodb.Collection<User>;
  Books?: mongodb.Collection<Book>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("GoodReads");
  await applySchemaValidation(db);

  const UsersCollection = db.collection<User>("Users");
  collections.Users = UsersCollection;

  const BooksCollection = db.collection<Book>("Books");
  collections.Books = BooksCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["firstName", "lastName", "email", "password", "profilePic"],
      additionalProperties: false,
      properties: {
        _id: {},
        firstName: {
          bsonType: "string",
          description: "'firstName' is required and is a string",
        },
        lastName: {
          bsonType: "string",
          description: "'LastName' is required and is a string",
        },
        email: {
          bsonType: "string",
          description: "'email' is required and is a string",
        },
        password: {
          bsonType: "string",
          description: "'password' is required and is a string",
        },
        profilePic: {
          bsonType: "string",
          description: "'profilePic' is required and is a string",
        },
      },
    },
  };

  const BooksSchema = {
    $jsonSchema: {
      bsonType: "object",
      //   required: ["firstName", "lastName", "email", "password", "profilePic"],
      additionalProperties: false,
      properties: {
        _id: {},
        Name: {
          bsonType: "string",
          description: "'Name' is required and is a string",
        },
        AuthName: {
          bsonType: "string",
          description: "'AuthName' is required and is a string",
        },
        Rating: {
          bsonType: "string",
          description: "'Rating' is required and is a string",
        },
        category: {
          bsonType: "string",
          description: "'category' is required and is a string",
        },
        profilePic: {
          bsonType: "string",
          description: "'profilePic' is required and is a string",
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: "Users",
    })

    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("Users", { validator: jsonSchema });
      } else {
        console.error("Validation error:", error);
      }
    });

  await db
    .command({
      collMod: "Books",
    })

    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("Books", { validator: BooksSchema });
      } else {
        console.error("Validation error:", error);
      }
    });
}

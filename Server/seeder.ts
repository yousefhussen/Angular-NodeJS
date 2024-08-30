// import { readFileSync } from "fs";
// import { ObjectId } from "mongodb";
// import mongoose from "mongoose";

// // Use ES6 import syntax
// import { faker } from "@faker-js/faker";

// import { User } from "./Schemas/users.schema";
// import { Author } from "./Schemas/authors.schema";
// import { Book } from "./Schemas/books.schema";
// import { Category } from "./Schemas/categories.schema";
// import { generateAuthors } from "./fake-data/author.FakeData";
// import { generateUsers } from "./fake-data/user.FakeData";
// import { generateBooks } from "./fake-data/book.FakeData";
// import { generateCategories } from "./fake-data/category.FakeData";

// class Seeder {
//   Objects: {
//     Author: (typeof Author)[];
//     User: (typeof User)[];
//     Book: (typeof Book)[];
//     Category: (typeof Category)[];
//   };

//   constructor() {
//     this.Objects = {
//       Author: [],
//       User: [],
//       Book: [],
//       Category: [],
//     };

//     const connectDB = async () => {
//       try {
//         await mongoose.connect("mongodb://localhost:27017/GoodReads");
//         console.log("connected to db");
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     connectDB();
//   }

//   async GenerateFakeData(model: mongoose.Model<any>, num: number) {
//     const generators: { [key: string]: (num: number) => any[] } = {
//       Author: generateAuthors,
//       User: generateUsers,
//       Book: generateBooks,
//       Category: generateCategories,
//     };

//     const generator = generators[model.modelName];
//     if (!generator) {
//       console.error(`No generator found for model: ${model.modelName}`);
//       return;
//     }
//     const data = generator(num);

//     try {
//       const docs = await model.insertMany(data);
//       this.Objects[model.modelName] = docs;
//       console.log(
//         `${docs.length} ${model.modelName} have been inserted into the database.`
//       );
//       console.log(this.Objects[model.modelName]);
//     } catch (err) {
//       console.error(err);
//       if (err.writeErrors) {
//         console.error(`${err.writeErrors.length} errors occurred during the insertMany operation.`);
//       }
//     }
//   }

//   async loadDataFromJson(model: mongoose.Model<any>, filePath: string) {
//     try {
//       const data = JSON.parse(readFileSync(filePath, 'utf-8'));
//       const docs = await model.insertMany(data);
//       this.Objects[model.modelName] = docs;
//       console.log(`Data from ${filePath} has been successfully inserted into ${model.modelName} collection.`);
//     } catch (error) {
//       console.log(`Failed to insert data from ${filePath}:`, error);
//     }
//   }

//   async FillReferences(
//     model: mongoose.Model<any>,
//     FieldToBeFilled: string,
//     data: any[],
//     referenceData: any[]
//   ) {
//     const schema = model.schema;
//     // Collect the paths where the field needs to be filled
//     const referencePaths = Object.keys(schema.paths).filter(
//       (path) => path === FieldToBeFilled
//     );

//     const savePromises = data.map((doc, index) => {
//       // Loop through each path where the field needs to be filled
//       referencePaths.forEach((referencePath) => {
//         const referenceId = new ObjectId(referenceData[index]._id);
//         // Set the reference ID in the document
//         doc[referencePath] = referenceId;
//       });

//       // Return the save promise
//       return doc.save();
//     });

//     // Wait for all save operations to complete
//     await Promise.all(savePromises);
//     console.log(
//       `${data.length} ${model.modelName} have been filled with reference data.`
//     );
//   }

//   EndConnection() {
//     mongoose.connection.close();
//   }
// }

// const SeederObject = new Seeder();

// async function AllInOrder() {
//   // await SeederObject.GenerateFakeData(Book, 1);
//   // await SeederObject.GenerateFakeData(Author, 10);
//   // await SeederObject.FillReferences(
//   //   Book,
//   //   "author",
//   //   SeederObject.Objects.Book,
//   //   SeederObject.Objects.Author
//   // );
//   await SeederObject.loadDataFromJson(Category, './fake-data/JSON/categories.json');
//   await SeederObject.loadDataFromJson(Author, './fake-data/JSON/authors.json');
//   await SeederObject.loadDataFromJson(Book, './fake-data/JSON/books.json');
//   await SeederObject.FillReferences(
//     Book,
//     "author",
//     SeederObject.Objects.Book,
//     SeederObject.Objects.Author
//   );
//   await SeederObject.FillReferences(
//     Book,
//     "category",
//     SeederObject.Objects.Book,
//     SeederObject.Objects.Category
//   );
//   await SeederObject.FillReferences(
//     Author,
//     "books",
//     SeederObject.Objects.Author,
//     SeederObject.Objects.Book
//   );

//   SeederObject.EndConnection();
// }

// AllInOrder();
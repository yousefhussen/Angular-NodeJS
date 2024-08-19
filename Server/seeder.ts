import { ObjectId } from "mongodb";

const { faker } = require("@faker-js/faker");

const { User } = require("./Schemas/users.schema");
const { Author } = require("./Schemas/authors.schema");
const { Book } = require("./Schemas/books.schema");
const { Category } = require("./Schemas/categories.schema");
const { generateAuthors } = require("./fake-data/author.FakeData");
const { generateUsers } = require("./fake-data/user.FakeData");
const { generateBooks } = require("./fake-data/book.FakeData");
const { generateCategories } = require("./fake-data/category.FakeData");
const mongoose = require("mongoose");

class Seeder {
  Objects: {
    Author: (typeof Author)[];
    User: (typeof User)[];
    Book: (typeof Book)[];
    Category: (typeof Category)[];
  };

  constructor() {
    this.Objects = {
      Author: [],
      User: [],
      Book: [],
      Category: [],
    };

    const connectDB = async () => {
      try {
        await mongoose.connect("mongodb://localhost:27017/GoodReads");
        console.log("connected to db");
      } catch (error) {
        console.error(error);
      }
    };
    connectDB();
  }

  async GenerateFakeData(model: any, num: number) {
    const generators = {
      Author: generateAuthors,
      User: generateUsers,
      Book: generateBooks,
      Category: generateCategories,
    };

    const generator = generators[`${model.modelName}`];
    if (!generator) {
      console.error(`No generator found for model: ${model.modelName}`);

      return;
    }
    const data = generator(num);

    await model
      .insertMany(data)
      .then((docs) => {
        this.Objects[model.modelName] = docs;
        console.log(
          `${docs.length} ${model.modelName} have been inserted into the database.`
        );
        console.log(this.Objects[model.modelName]);
      })
      .catch((err) => {
        console.error(err);
        console.error(
          `${
            err.writeErrors?.length ?? 0
          } errors occurred during the insertMany operation.`
        );
      });
  }

  async FillRefrrences(
    model: any,
    FieldToBeFilled: string,
    data: any[],
    referenceData: any[]
  ) {
    const schema = model.schema;
    // Collect the paths where the field needs to be filled
    const referencePaths = Object.keys(schema.paths).filter(
      (path) => path === FieldToBeFilled
    );
    console.log(referenceData);
    const savePromises = data.map((doc, index) => {
      // Loop through each path where the field needs to be filled
      referencePaths.forEach((referencePath) => {
        // Get the reference ID from the reference data

        console.log(referenceData[index]._id);
        console.log(typeof referenceData[index]._id);
        const referenceId = new ObjectId(referenceData[index]._id);
        // Set the reference ID in the document
        doc[referencePath] = referenceId;
      });

      // Return the save promise
      return doc.save();
    });

    // Wait for all save operations to complete
    await Promise.all(savePromises);
    console.log(
      `${data.length} ${model.modelName} have been filled with reference data.`
    );
  }
  EndConnection() {
    mongoose.connection.close();
  }
}
const SeederOvbject = new Seeder();
async function AllInOrder() {
  await SeederOvbject.GenerateFakeData(Book, 1);
  await SeederOvbject.GenerateFakeData(Author, 10);
  await SeederOvbject.FillRefrrences(
    Book,
    "author",
    SeederOvbject.Objects.Book,
    SeederOvbject.Objects.Author
  );
  SeederOvbject.EndConnection();
}

AllInOrder();

//end connection and  exit

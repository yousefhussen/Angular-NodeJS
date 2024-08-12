const { faker } = require('@faker-js/faker');

const {User }= require('./Schemas/users.schema');
const {generateAuthors} = require('./fake-data/author.FakeData');
const generateUsers = (num) => {
    const user = [];
  
    for (let i = 0; i < num; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const profilePic = faker.image.avatar();
  
      user.push({
        firstName,
        lastName,
        email,
        password,
        profilePic
      });
    }
  
    return user;
  };
  

  

const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/GoodReads");
      console.log("connected to db");
    } catch (error) {
      console.error(error);
    }
  };
connectDB()

const user = generateUsers(50);
User.insertMany(user)
  .then(docs => console.log(`${docs.length} users have been inserted into the database.`))
  .catch(err => {
    console.error(err);
    console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
  });

  const author = generateAuthors(50);
User.insertMany(user)
  .then(docs => console.log(`${docs.length} authors
   have been inserted into the database.`))
  .catch(err => {
    console.error(err);
    console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
  });

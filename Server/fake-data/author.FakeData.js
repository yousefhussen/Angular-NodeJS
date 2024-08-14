const { faker } = require('@faker-js/faker');
const { ObjectId } = require('mongodb');

const generateAuthors = (num) => {
    const author = [];
  
    for (let i = 0; i < num; i++) {
      const FirstName = faker.name.firstName();
      const LastName = faker.name.lastName();
        const DateOfBirth = faker.date.recent();
        const Photo = faker.image.avatar();
        const Books = [new ObjectId()];
  
      author.push({
        FirstName,
        LastName,
        DateOfBirth,
        Photo,
        Books,

        
      });
    }
  
    return author;
  };
  
  module.exports = { generateAuthors };
  
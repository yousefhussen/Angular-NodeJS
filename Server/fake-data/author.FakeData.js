const faker = require('faker');
const { ObjectId } = require('mongodb');

const generateAuthors = (num) => {
    const user = [];
  
    for (let i = 0; i < num; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
        const DateOfBirth = faker.date.recent();
        const Photo = faker.image.avatar();
        const Books = new ObjectId();
  
      author.push({
        firstName,
        lastName,
        DateOfBirth,
        Photo,
        Books,

        
      });
    }
  
    return author;
  };
  
  module.exports = { generateAuthors };
  
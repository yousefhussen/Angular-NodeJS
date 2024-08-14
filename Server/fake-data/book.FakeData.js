const { faker } = require('@faker-js/faker');
const { ObjectId } = require('mongodb');

const generateBooks = (num) => {
    const books = [];
  
    for (let i = 0; i < num; i++) {
      const name = faker.name.firstName();
      const content = faker.string.binary();
        const Rating = faker.number.float({ min: 1, max: 5 });
        const Reviews = [new ObjectId()];
        const Year = faker.date.past().getFullYear();
        const CoverPhoto = faker.image.urlPlaceholder();
        const Author = new ObjectId();
  
        books.push({
        name,
        content,
        Rating,
        Reviews,
        Author,
        Year,
        CoverPhoto

        
      });
    }
  
    return books;
  };
  
  module.exports = { generateBooks };
  
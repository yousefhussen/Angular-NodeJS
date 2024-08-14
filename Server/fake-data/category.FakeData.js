const { faker } = require('@faker-js/faker');
const { ObjectId } = require('mongodb');

const generateCategories = (num) => {
    const category = [];
  
    for (let i = 0; i < num; i++) {
      const name = faker.word.noun();
      category.push({
      name,
        
      });
    }
  
    return category;
  };
  
  module.exports = { generateCategories };
  
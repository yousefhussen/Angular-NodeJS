const { faker } = require("@faker-js/faker");
const { ObjectId } = require("mongodb");

const generateReviews = (num) => {
  const review = [];

  for (let i = 0; i < num; i++) {
    const Title = faker.lorem.sentence();
    const content = faker.string.binary();
    const Rating = faker.number.float({ min: 1, max: 5 });
    const User = new ObjectId();

    review.push({
      Title,
      content,
      Rating,
      User,
    });
  }

  return review;
};

module.exports = { generateReviews };

const { faker } = require('@faker-js/faker');

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
  
  module.exports = { generateUsers };
  
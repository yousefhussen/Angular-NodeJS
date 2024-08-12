const { faker } = require("@faker-js/faker");
import { User } from "../Schemas/users.schema.ts";
const users: any[] = [];
for (let i = 0; i < 10; i++) {
  const user = new User({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    profilePic: faker.image.avatar(),
  });
  users.push(user);
}
module.exports = { users };

import * as mongodb from 'mongodb';

export interface User {
    _id?: mongodb.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePic: string;
}

export class UserObject implements User {
    constructor(
      public firstName: string,
      public lastName: string,
      public email: string,
      public password: string,
      public profilePic: string
    ) {}
  }
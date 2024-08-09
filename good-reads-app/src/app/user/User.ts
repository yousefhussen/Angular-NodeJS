import * as mongodb from 'mongodb';

export interface User {
    _id?: mongodb.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePic: string|null;
}
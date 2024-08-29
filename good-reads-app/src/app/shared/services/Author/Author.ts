import * as mongodb from 'mongodb';

export interface Author {
    _id?: mongodb.ObjectId;
    FirstName: string;
    LastName: string;
    DateOfBirth: string;
    Photo: string;
    Books: mongodb.ObjectId[]; 
}
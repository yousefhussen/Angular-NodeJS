import * as mongodb from 'mongodb';
import { Book } from '../Book/Book';

export interface Category {
  _id?: mongodb.ObjectId; // Optional field for MongoDB's ObjectId
  name: string;
  Books: Book[];
  icon: string;
  color: string;
}

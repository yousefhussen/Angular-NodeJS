import * as mongodb from 'mongodb';
import { Author } from '../Author/Author';

export interface Book {
  _id?: mongodb.ObjectId;
  name: string;
  content: string;
  Rating: string;
  Reviews: string;
  author: Author;
  Year: Date;
  CoverPhoto: string;
  Category: string;
}

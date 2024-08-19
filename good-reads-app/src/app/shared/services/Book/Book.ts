import * as mongodb from 'mongodb';
import { Author } from '../Author/Author';

export interface Book {
  _id?: mongodb.ObjectId;
  name: string;
  content: string;
  Rating: string;
  Reviews: string;
  author: Author | null;
  Year: Date;
  CoverPhoto: string;
  Category: string;
}

export  function createBook(): Book {
  return {
    Category: 'New Book',
    name: 'John Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    CoverPhoto: 'https://via.placeholder.com/150',
    Year: new Date(),
    author: null,
    Rating: '4.5',
    Reviews: '',
    _id: new mongodb.ObjectId(1),
  };
}

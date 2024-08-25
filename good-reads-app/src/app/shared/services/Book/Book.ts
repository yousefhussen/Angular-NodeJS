import * as mongodb from 'mongodb';
import { Author } from '../Author/Author';
import { Category } from '../Category/category';

export interface Book {
categoryId: string | null;
  _id?: mongodb.ObjectId;
  name: string;
  content: string;
  Rating: string;
  Reviews: string;
  author: Author | null;
  authorId: string | null;
  Year: string;
  CoverPhoto: string;
  Category: Category | null;
}

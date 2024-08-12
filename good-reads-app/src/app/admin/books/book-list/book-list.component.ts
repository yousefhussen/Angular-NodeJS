import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books = [
    // Example book data
    { id: 1, photo: '', name: 'Jess', categoryId: 111, authorId: 222 },
    {
      id: 2,
      photo: 'path-to-photo2.jpg',
      name: 'Jess',
      categoryId: 111,
      authorId: 222,
    },
    {
      id: 3,
      photo: 'path-to-photo3.jpg',
      name: 'Jess',
      categoryId: 111,
      authorId: 222,
    },
    {
      id: 4,
      photo: 'path-to-photo4.jpg',
      name: 'Jess',
      categoryId: 111,
      authorId: 222,
    },
  ];

  categories = [
    { id: 111, name: 'Category 1' },
    { id: 112, name: 'Category 2' },
  ];

  authors = [
    { id: 222, name: 'Author 1' },
    { id: 223, name: 'Author 2' },
  ];

  newBook = { id: 0, photo: '', name: '', categoryId: 0, authorId: 0 };

  showAddBookModal = false;

  openAddBookModal() {
    this.showAddBookModal = true;
  }

  closeAddBookModal() {
    this.showAddBookModal = false;
  }

  addBook() {
    if (this.newBook.name && this.newBook.categoryId && this.newBook.authorId) {
      const newBook = {
        ...this.newBook,
        id: this.books.length + 1,
      };
      this.books.push(newBook);
      this.closeAddBookModal();
    }
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
  }

  editBook(
    book: {
      id: number;
      photo: string;
      name: string;
      categoryId: number;
      authorId: number;
    },
    index: number
  ) {
    this.newBook = { ...book };
    this.books.splice(index, 1);
    this.openAddBookModal();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // const reader: any
    }
  }
}

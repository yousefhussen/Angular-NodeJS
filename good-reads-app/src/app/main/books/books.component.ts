import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../shared/services/Book/book.service';
import { Book } from '../../shared/services/Book/Book';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  books: Book[] = [
    
  ];

  paginatedBooks: Book[] = this.books;
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 1;

  constructor(protected BookService: BookService) {
    this.BookService.getBooks().then((books) => {
      this.books = books;
      this.totalPages = Math.ceil(this.books.length / this.itemsPerPage);
      this.updatePaginatedBooks();
    });
  }

  ngOnInit() {
    this.totalPages = Math.ceil(this.books.length / this.itemsPerPage);
    this.updatePaginatedBooks();
  }

  updatePaginatedBooks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBooks = this.books.slice(startIndex, endIndex);
    console.log(this.paginatedBooks);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedBooks();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedBooks();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedBooks();
  }

  get pages() {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }
}

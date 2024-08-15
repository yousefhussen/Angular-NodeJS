import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../shared/services/Book/book.service';
import { Book } from '../../shared/services/Book/Book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {

  ToPage(arg0: number) {
    this.currentPage = arg0;
  }
   
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    nextPage(): void {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
goToAuthorDetails(arg0: import("bson").ObjectId|undefined) {
  this.Rrouter.navigate(['/authors', arg0]);
}
goToBookDetails(_t6: import("bson").ObjectId|undefined) {
  this.Rrouter.navigate(['/books', _t6]);
}
  books: Book[] = [
    
  ];

  paginatedBooks: Book[] = this.books;
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 1;

  constructor(protected BookService: BookService, protected Rrouter:Router) {
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

 

  get pages() {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }
}

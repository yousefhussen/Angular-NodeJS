import { Component } from '@angular/core';
import { Category, CategoryService } from '../../../shared/services/Category/category.service';
import { Book } from '../../../shared/services/Book/Book';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  category: Category|null = null;
  books: Book[] = [];
  categoryName: string = '';
  CategoryService: CategoryService;
paginatedBooks: any;
  Rrouter!: Router;
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 1;

  constructor(CategoryService: CategoryService,ActiveRoute: ActivatedRoute,Rrouter:Router) {
    this.Rrouter=Rrouter;
    
   
    let name = ActiveRoute.snapshot.paramMap.get('name');
    if (name) {
      this.categoryName = name;
    }

    this.CategoryService = CategoryService;

  }
  ngOnInit(): void {
    this.totalPages = Math.ceil(this.books.length / this.itemsPerPage);
    this.updatePaginatedBooks();
    this.CategoryService.getCategoryBooks(this.categoryName).then((books) => {
      this.books = books;
      this.totalPages = Math.ceil(this.books.length / this.itemsPerPage);
      this.updatePaginatedBooks();
    });
  }


  
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

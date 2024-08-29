import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { BooksComponent } from '../main/books/books.component';
import { BooksModule } from './books/books.module';
import { BookListComponent } from './books/book-list/book-list.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';

const routes: Routes = [
  { path: 'categories', component: CategoryListComponent },
  { path: 'books', component: BookListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-navbar', component: AdminNavbarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

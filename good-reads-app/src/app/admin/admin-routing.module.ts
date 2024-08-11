import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { BooksComponent } from '../main/books/books.component';
import { BooksModule } from './books/books.module';
import { BookListComponent } from './books/book-list/book-list.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';

const routes: Routes = [{ path: 'categories', component: CategoryListComponent },
  { path: 'books', component: BookListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'admin-login', component: AdminLoginComponent }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

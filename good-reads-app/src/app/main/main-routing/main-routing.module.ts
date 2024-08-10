import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BooksComponent } from '../books/books.component';
import { CategoriesComponent } from '../categories/categories.component';
import { AuthorsComponent } from '../authors/authors.component';
import { BookComponent } from '../books/book/book.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  {
    path: 'books',
    children: [
      { path: '', component: BooksComponent },
      { path: ':id', component: BookComponent },
    ],
  },
  { path: 'categories', component: CategoriesComponent },
  { path: 'authors', component: AuthorsComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

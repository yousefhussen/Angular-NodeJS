import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BooksComponent } from '../books/books.component';
import { CategoriesComponent } from '../categories/categories.component';
import { AuthorsComponent } from '../authors/authors.component';
import { BookComponent } from '../books/book/book.component';
import { AuthorComponent } from '../authors/author/author.component';

const routes: Routes = [
  // { path: '', component: MainComponent },
  { path: '', component: HomeComponent },
  {
    path: 'books',
    children: [
      { path: '', component: BooksComponent },
      { path: ':id', component: BookComponent },
    ],
  },
  { path: 'categories', component: CategoriesComponent },
  {
    path: 'authors',
    children: [
      { path: '', component: AuthorsComponent },
      { path: ':id', component: AuthorComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

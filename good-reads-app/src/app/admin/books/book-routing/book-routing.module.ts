import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component';

const routes: Routes = [{ path: 'book-list', component: BookListComponent }];



@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule { }

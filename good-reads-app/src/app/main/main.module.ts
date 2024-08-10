import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing/main-routing.module';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    CategoriesComponent, // Declare the CategoriesComponent here
  ],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}

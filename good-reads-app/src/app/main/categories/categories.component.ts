import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/Category/category.service';
import { Category } from '../../shared/services/Category/category';
import { CommonModule, NgStyle } from '@angular/common';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-category',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [CommonModule,RouterModule, NgStyle],
  standalone: true,
})
export class CategoriesComponent implements OnInit {
  categories!: Category[];

  constructor(private CategoryService: CategoryService) {
    this.CategoryService = CategoryService;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.categories = await this.CategoryService.getCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  categories = [
    { id: 1, name: 'Culture' },
    { id: 2, name: 'Sport' },
    { id: 3, name: 'Economics' },
    { id: 4, name: 'Technology' }
  ];

  newCategory = { id: 0, name: '' };
  showAddCategoryForm = false;
  editingIndex: number | null = null;

  // Open the Add Category Form
  toggleAddCategoryForm() {
    this.showAddCategoryForm = !this.showAddCategoryForm;
    if (!this.showAddCategoryForm) {
      this.resetForm();
    }
  }

  // Add a new category or update an existing one
  addCategory() {
    if (this.newCategory.name) {
      if (this.editingIndex !== null) {
        // Update existing category
        this.categories[this.editingIndex] = { ...this.newCategory };
      } else {
        // Add new category
        const newCategory = {
          ...this.newCategory,
          id: this.categories.length ? this.categories[this.categories.length - 1].id + 1 : 1
        };
        this.categories.push(newCategory);
      }

      this.resetForm(); // Reset the form and variables
      this.toggleAddCategoryForm(); // Hide the form after adding
    }
  }

  // Delete a category by index
  deleteCategory(index: number) {
    this.categories.splice(index, 1);
  }

  // Edit an existing category
  editCategory(category: { id: number; name: string }, index: number) {
    this.newCategory = { ...category };
    this.editingIndex = index;
    this.showAddCategoryForm = true;
  }

  // Reset the form and state variables
  resetForm() {
    this.newCategory = { id: 0, name: '' };
    this.editingIndex = null;
  }
}

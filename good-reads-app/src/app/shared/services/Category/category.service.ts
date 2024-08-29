// category.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../BaseService';
import { Category } from './category';
import { Book } from '../Book/Book';


@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  deleteCategory(id: string) {
    return this.delete(this.CategoriesEndpoint + '/' + id);
  }
  updateCategory(id: any, formData: any) {
    return this.put(this.CategoriesEndpoint + '/' + id, formData);
  }
  CreateCategory(formData: any) : Promise<Category> {
    return this.post(this.CategoriesEndpoint, formData);
  }
  private CategoriesEndpoint = 'Categories';
  Categories$ = signal<Category[]>([]);

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  private async refreshCategories(): Promise<void> {
    const categories = await this.get<Category[]>(this.CategoriesEndpoint);
    this.Categories$.set(categories ?? []);
  }

  async getCategories(): Promise<Category[]> {
    await this.refreshCategories();
    return this.Categories$() ?? [];
  }
  async getCategoryBooks(categoryName: string): Promise<Book[]> {
    return   await this.get<Book[]>(this.CategoriesEndpoint+"/"+categoryName);
  }
}
export { Category };

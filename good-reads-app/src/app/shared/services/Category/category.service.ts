// category.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../BaseService';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
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
}

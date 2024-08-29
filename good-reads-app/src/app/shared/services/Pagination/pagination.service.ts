import { Injectable } from '@angular/core';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PaginateService<T> {
  public items: T[] = [];
  public paginatedItems: T[] = this.items;
  public currentPage = 1;
  public itemsPerPage = 10;
  public totalPages = 1;

  constructor() { }

  public setItemsPerPage(id: string, itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.updatePaginatedItems();
  }
  public updatePaginatedItems(): void {
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.items.slice(startIndex, endIndex);
  }

  ToPage(arg0: number) {
    this.currentPage = arg0;
    this.updatePaginatedItems();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }

}

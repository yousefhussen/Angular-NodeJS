// user.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './Book';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root',
})
export class BookService extends BaseService {
  private booksEndpoint = 'Books';
  Books$ = signal<Book[]>([]);
  Book$ = signal<Book | null>(null);

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  public async refreshBooks(): Promise<void> {
    const users = await this.get<Book[]>(this.booksEndpoint);
    this.Books$.set(users ?? []);
  }

  public async refresh(): Promise<void> {
    const users = await this.get<Book[]>(this.booksEndpoint);
    this.Books$.set(users ?? []);
  }

  async getBooks(): Promise<Book[]> {
    await this.refreshBooks();
    return this.Books$() ?? [];
  }

  async getBook(id: string): Promise<Book | null> {
    return this.get<Book>(`${this.booksEndpoint}/${id}`);
  }

  async createBook(user: Book):Promise<any>  {
    const response = await this.post<any>(`${this.booksEndpoint}`, user);
    return response;
  }

  async fetch(): Promise<Book[]> {
    await this.refreshBooks();
    return this.Books$() ?? [];
  }

  async create(user: Book):Promise<any>  {
    const response = await this.post<any>(`${this.booksEndpoint}`, user);
    return response;
  }

  async updateBook(id: string, user: Book): Promise<Book | null> {
    return this.put<Book>(`${this.booksEndpoint}/${id}`, user);
  }

  async update(id: string, user: Book): Promise<Book | null> {
    return this.put<Book>(`${this.booksEndpoint}/${id}`, user);
  }

  async deleteBook(id: string): Promise<Book | null> {
    return this.delete<Book>(`${this.booksEndpoint}/${id}`);
  }
}

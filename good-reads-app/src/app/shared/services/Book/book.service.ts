// book.service.ts
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
    const books = await this.get<Book[]>(this.booksEndpoint);
    this.Books$.set(books ?? []);
  }

  public async refresh(): Promise<void> {
    const books = await this.get<Book[]>(this.booksEndpoint);
    this.Books$.set(books ?? []);
  }

  async getBooks(): Promise<Book[]> {
    await this.refreshBooks();
    return this.Books$() ?? [];
  }

  async getBook(id: string): Promise<Book | null> {
    return this.get<Book>(`${this.booksEndpoint}/${id}`);
  }

  async createBook(book: Book): Promise<any> {
    const response = await this.post<any>(`${this.booksEndpoint}`, book);
    return response;
  }

  async fetch(): Promise<Book[]> {
    await this.refreshBooks();
    return this.Books$() ?? [];
  }

  async create(book: Book): Promise<any> {
    const response = await this.post<any>(`${this.booksEndpoint}`, book);
    return response;
  }

  async updateBook(id: string, book: Book): Promise<Book | null> {
    return this.put<Book>(`${this.booksEndpoint}/${id}`, book);
  }

  async updateBookPDF(id: string, book: File): Promise<File | null> {
    return this.put<File>(`${this.booksEndpoint}/pdf/${id}`, book);
  }

  async update(id: string, book: Book): Promise<Book | null> {
    return this.put<Book>(`${this.booksEndpoint}/${id}`, book);
  }

  async deleteBook(id: string): Promise<Book | null> {
    return this.delete<Book>(`${this.booksEndpoint}/${id}`);
  }
}

// Author.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from './Author';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends BaseService {
  private AuthorsEndpoint = 'Authors';
  Authors$ = signal<Author[]>([]);
  Author$ = signal<Author | null>(null);

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  

  public async refreshAuthors(): Promise<void> {
    const Authors = await this.get<Author[]>(this.AuthorsEndpoint);
    
    this.Authors$.set(Authors ?? []);
  }

  async getAuthors(): Promise<Author[]> {
    await this.refreshAuthors();
   
    
    return this.Authors$() ?? [];
  }

  async getAuthor(id: string): Promise<Author | null> {
    return this.get<Author>(`${this.AuthorsEndpoint}/${id}`);
  }

  async createAuthor(Author: Author):Promise<any>  {
    const response = await this.post<any>(`${this.AuthorsEndpoint}`, Author);
    return response;
  }

  async updateAuthor(id: string, Author: Author): Promise<Author | null> {
    console.log(Author);
    try {
    return this.patch<Author>(`${this.AuthorsEndpoint}/${id}`, Author);
    } catch (error) {
      console.error("Error updating author:", error);
      return null;
    }
  }

  async deleteAuthor(id: string): Promise<Author | null> {
    return this.delete<Author>(`${this.AuthorsEndpoint}/${id}`);
  }
}

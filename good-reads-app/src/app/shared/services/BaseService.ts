import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { first } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  protected url: string;
  protected httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.url = environment.BackendServerUrl;
  }

  protected getBaseUrl(): string {
    return environment.BackendServerUrl;
  }

  protected getFullUrl(endpoint: string): string {
    return `${this.getBaseUrl()}/${endpoint}`;
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const response = await firstValueFrom(
      this.httpClient.get<T>(this.getFullUrl(endpoint))
    );
    if (!response) {
      throw new Error('HTTP request failed');
    }
    return response;
  }

  protected async post<T>(endpoint: string, body: any): Promise<T> {
    const response = await firstValueFrom(
      this.httpClient.post<T>(this.getFullUrl(endpoint), body)
    );
    if (!response) {
        throw new Error('HTTP request failed');
      }
      return response;
  }

  protected async put<T>(endpoint: string, body: any): Promise<T> {
    const response = await firstValueFrom(
      this.httpClient.put<T>(this.getFullUrl(endpoint), body)
    );
    if (!response) {
      throw new Error('HTTP request failed');
    }
    return response;
  }
  
  protected async delete<T>(endpoint: string): Promise<T> {
    const response = await firstValueFrom(
      this.httpClient.delete<T>(this.getFullUrl(endpoint))
    );
    if (!response) {
      throw new Error('HTTP request failed');
    }
    return response;
  }
}

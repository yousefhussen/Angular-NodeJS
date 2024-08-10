// user.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private usersEndpoint = 'Users';
  Users$ = signal<User[]>([]);
  User$ = signal<User | null>(null);

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  private async refreshUsers(): Promise<void> {
    const users = await this.get<User[]>(this.usersEndpoint);
    this.Users$.set(users ?? []);
  }

  async getUsers(): Promise<User[]> {
    await this.refreshUsers();
    return this.Users$() ?? [];
  }

  async getUser(id: string): Promise<User | null> {
    return this.get<User>(`${this.usersEndpoint}/${id}`);
  }

  async createUser(user: User): Promise<User | null> {
    return this.post<User>(`${this.usersEndpoint}`, user);
  }

  async updateUser(id: string, user: User): Promise<User | null> {
    return this.put<User>(`${this.usersEndpoint}/${id}`, user);
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.delete<User>(`${this.usersEndpoint}/${id}`);
  }
}

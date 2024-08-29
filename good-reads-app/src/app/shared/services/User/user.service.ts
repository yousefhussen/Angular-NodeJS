// user.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  login(email: string, password: string) {
    return this.post(`${this.usersEndpoint}/login/`, {
      email: email,
      password: password,
    });
  }
  ResetPassword(email: string, Password: string) {
    return this.post(`${this.usersEndpoint}/reset-password/`, {
      email: email,
      password: Password,
    });
  }
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

  async createUser(user: User): Promise<any> {
    const response = await this.post<any>(`${this.usersEndpoint}`, user);
    return response;
  }

  async updateUser(id: string, user: User): Promise<User | null> {
    return this.put<User>(`${this.usersEndpoint}/${id}`, user);
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.delete<User>(`${this.usersEndpoint}/${id}`);
  }
  async ForgetPasswordRequest(email: string): Promise<User> {
    return this.get(`${this.usersEndpoint}/ForgetPassword/${email}`);
  }
}

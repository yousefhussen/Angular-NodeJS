import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:5200';
  Users$ = signal<User[]>([]);
  User$ = signal<User>({} as User);
  
  constructor(private httpClient: HttpClient) { }

  private refreshEmployees() {
    this.httpClient.get<User[]>(`${this.url}/Users`)
      .subscribe(Users => {
        this.Users$.set(Users);
      });
  }

  getEmployees() {
    this.refreshEmployees();
    return this.Users$();
  }

  getEmployee(id: string) {
    this.httpClient.get<User>(`${this.url}/Users/${id}`).subscribe(User => {
      this.User$.set(User);
      return this.User$();
    });
  }

  createEmployee(User: User) {
    console.log(User);
    console.log(`${this.url}/Users`);
    return this.httpClient.post(`${this.url}/Users`, User, { responseType: 'text' });
  }

  updateEmployee(id: string, User: User) {
    return this.httpClient.put(`${this.url}/Users/${id}`, User, { responseType: 'text' });
  }

  deleteEmployee(id: string) {
    return this.httpClient.delete(`${this.url}/Users/${id}`, { responseType: 'text' });
  }
}
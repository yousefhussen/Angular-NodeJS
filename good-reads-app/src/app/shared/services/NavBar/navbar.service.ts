import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  constructor(private http: HttpClient) {}

  addAdmin(adminData: { username: string; password: string }): Observable<any> {
    return this.http.post('/', adminData);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../BaseService';
@Injectable({
  providedIn: 'root',
})
export class NavbarService extends BaseService {


  addAdmin(adminData: { username: string; password: string }): Promise<any> {
    return this.post<any>('Admin/', adminData);
  }
}

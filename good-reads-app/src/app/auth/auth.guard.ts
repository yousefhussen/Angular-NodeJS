import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // your logic here
    if (sessionStorage.getItem('token') !== null) {
      return of(true);
    } else {
      this.router.navigate(['/Welcome']);
      return of(false);
    }
  }
}

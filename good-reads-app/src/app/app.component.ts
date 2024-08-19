// app.component.ts
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from "./admin/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent, NavbarComponent, FooterComponent, AdminNavbarComponent],
})
export class AppComponent {
  showHeaderFooter = true;
  constructor(private router: Router) {}

  login() {
    console.log(this.router.config);
    this.router.navigate(['auth/login']);
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // List of routes where the navbar and footer should not be shown
        const noHeaderFooterRoutes = ['/admin/books','/admin/authors','/admin/categories'];
        this.showHeaderFooter = !noHeaderFooterRoutes.includes(event.urlAfterRedirects);
      }
    });
  }
  title = 'good-reads-app';
}

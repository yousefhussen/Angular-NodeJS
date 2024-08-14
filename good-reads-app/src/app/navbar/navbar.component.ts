import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
})
export class NavbarComponent {
  username: string | null = '';
  sidebarOpen: boolean = false;
  loggedIn: boolean = false; // New variable to track login status

  constructor(protected router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('loggedInUser');
    this.loggedIn = !!sessionStorage.getItem('token'); // Check if token exists in session storage

    if (this.loggedIn) {
      // If logged in, display the icons and username
      document
        .querySelectorAll('.profile-icon, .username, .logout-button')
        .forEach((el) => {
          (el as HTMLElement).style.display = 'flex';
        });
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('token'); // Clear the token on logout
    this.router.navigate(['/auth/signup']);
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}

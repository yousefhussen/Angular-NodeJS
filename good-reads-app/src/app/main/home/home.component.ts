import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if a user is logged in
    this.isLoggedIn = !!localStorage.getItem('loggedInUser');
    this.username = localStorage.getItem('loggedInUser'); // Assuming the username is stored in localStorage
  }

  logout() {
    // Clear the logged-in user from local storage
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

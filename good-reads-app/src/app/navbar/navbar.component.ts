import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
})
export class NavbarComponent {
  @Output() search = new EventEmitter<string>();

  username: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('loggedInUser');
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/auth/signup']);
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.search.emit(query);
  }
}

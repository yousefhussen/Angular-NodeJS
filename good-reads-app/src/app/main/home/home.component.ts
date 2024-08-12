import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = '';

  selectedFilter: string = 'All';
  books = [
    {
      title: 'Book Title 1',
      author: 'Author Name 1',
      avgRate: 4,
      rating: 1200,
      currentShelf: 'Shelve',
    },
    {
      title: 'Book Title 2',
      author: 'Author Name 2',
      avgRate: 3,
      rating: 980,
      currentShelf: 'Read',
    },
    {
      title: 'Book Title 3',
      author: 'Author Name 3',
      avgRate: 4,
      rating: 1500,
      currentShelf: 'Reading',
    },
  ];

  filteredBooks = this.books;

  shelfOptions: string[] = ['Read', 'Reading', 'Want to Read'];

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('loggedInUser');
    this.username = localStorage.getItem('loggedInUser');
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;
    this.router.navigate(['/auth/signup']);
  }

  toggleShelf(book: any) {
    const currentIndex = this.shelfOptions.indexOf(book.currentShelf);
    const nextIndex = (currentIndex + 1) % this.shelfOptions.length;
    book.currentShelf = this.shelfOptions[nextIndex];
  }

  filterBooks(filter: string) {
    this.selectedFilter = filter;
    if (filter === 'All') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(
        (book) => book.currentShelf === filter
      );
    }
  }

  handleSearch(query: string) {
    this.filteredBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(query)
    );
  }
}

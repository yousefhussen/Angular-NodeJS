import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories = [
    { name: 'Economics', icon: 'fas fa-chart-line', color: '#CCD5AE' },
    { name: 'Sport', icon: 'fas fa-futbol', color: '#E0E5B6' },
    { name: 'Society', icon: 'fas fa-users', color: '#FAEDCE' },
    { name: 'Art', icon: 'fas fa-paint-brush', color: '#FEFAE0' },
    { name: 'Horror', icon: 'fas fa-ghost', color: '#CCD5AE' },
    { name: 'Paranormal', icon: 'fas fa-superpowers', color: '#E0E5B6' },
    { name: 'Fantasy', icon: 'fas fa-dragon', color: '#FAEDCE' },
    { name: 'Fiction', icon: 'fas fa-book-open', color: '#FEFAE0' },
    { name: 'Romance', icon: 'fas fa-heart', color: '#CCD5AE' },
  ];

  constructor() {}

  ngOnInit(): void {}
}

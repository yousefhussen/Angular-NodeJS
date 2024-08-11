import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule],  // Import CommonModule to use Angular pipes like 'date'
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent {
  authors = [
    { id: 1, photo: 'path/to/photo1.jpg', firstName: 'John', lastName: 'Doe', dateOfBirth: '1985-05-15' },
    { id: 2, photo: 'path/to/photo2.jpg', firstName: 'Jane', lastName: 'Nicolas', dateOfBirth: '1990-07-20' },
    { id: 3, photo: 'path/to/photo3.jpg', firstName: 'Steve', lastName: 'Smith', dateOfBirth: '1975-11-30' },
    { id: 4, photo: 'path/to/photo3.jpg', firstName: 'Mark', lastName: 'Samn', dateOfBirth: '1975-11-30' },
    { id: 5, photo: 'path/to/photo3.jpg', firstName: 'Angelo', lastName: 'Mic', dateOfBirth: '1975-11-30' },
    // Add more authors as needed
  ];
}

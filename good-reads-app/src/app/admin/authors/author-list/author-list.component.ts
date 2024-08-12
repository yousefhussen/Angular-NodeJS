import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent {

  authors = [
    // Example author data
    { id: 1, photo: 'path-to-photo1.jpg', firstName: 'John', lastName: 'Doe', dateOfBirth: '1985-05-15' },
    { id: 2, photo: 'path-to-photo2.jpg', firstName: 'Jane', lastName: 'Smith', dateOfBirth: '1990-07-20' },
    { id: 3, photo: 'path-to-photo3.jpg', firstName: 'Steve', lastName: 'Johnson', dateOfBirth: '1975-11-30' },
    { id: 4, photo: 'path-to-photo4.jpg', firstName: 'Mary', lastName: 'Brown', dateOfBirth: '1980-02-10' }
  ];

  newAuthor = {
    id: 0,
    photo: '',
    firstName: '',
    lastName: '',
    dateOfBirth: ''
  };

  showAddAuthorModal = false;

  openAddAuthorModal() {
    this.showAddAuthorModal = true;
  }

  closeAddAuthorModal() {
    this.showAddAuthorModal = false;
  }

  addAuthor() {
    if (this.newAuthor.firstName && this.newAuthor.lastName && this.newAuthor.dateOfBirth) {
      const newAuthor = {
        ...this.newAuthor,
        id: this.authors.length + 1
      };
      this.authors.push(newAuthor);
      this.closeAddAuthorModal();
    }
  }

  deleteAuthor(index: number) {
    this.authors.splice(index, 1);
  }

  editAuthor(author: { id: number; photo: string; firstName: string; lastName: string; dateOfBirth: string }, index: number) {
    this.newAuthor = { ...author };
    this.authors.splice(index, 1);
    this.openAddAuthorModal();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newAuthor.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

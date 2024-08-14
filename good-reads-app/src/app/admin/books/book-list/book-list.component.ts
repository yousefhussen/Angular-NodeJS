import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
registerForm: any;
removeImage() {
throw new Error('Method not implemented.');
}
  books = [
    // Example book data
    { id: 1, photo: '', name: 'Jess', categoryId: 111, authorId: 222 },
    {
      id: 2,
      photo: 'path-to-photo2.jpg',
      name: 'Jess',
      categoryId: 111,
      authorId: 222,
    },
    {
      id: 3,
      photo: 'path-to-photo3.jpg',
      name: 'Jess',
      categoryId: 111,
      authorId: 222,
    },
    {
      id: 4,
      photo: 'path-to-photo4.jpg',
      name: 'Jess',
      categoryId: 111,
      authorId: 222,
    },
  ];

  categories = [
    { id: 111, name: 'Category 1' },
    { id: 112, name: 'Category 2' },
  ];

  authors = [
    { id: 222, name: 'Author 1' },
    { id: 223, name: 'Author 2' },
  ];

  newBook = { id: 0, photo: '', name: '', categoryId: 0, authorId: 0 };

  showAddBookModal = false;
    uploadDone: boolean | undefined;
  uploadInProgress: boolean = false;
  uploadProgress!: number;
  dataURItoBlob: any;
  imageCompress: any;
  file: File | undefined;
  imagePreviewUrl: string | ArrayBuffer | null | undefined;

  openAddBookModal() {
    this.showAddBookModal = true;
  }

  closeAddBookModal() {
    this.showAddBookModal = false;
  }

  addBook() {
    if (this.newBook.name && this.newBook.categoryId && this.newBook.authorId) {
      const newBook = {
        ...this.newBook,
        id: this.books.length + 1,
      };
      this.books.push(newBook);
      this.closeAddBookModal();
    }
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
  }

  editBook(
    book: {
      id: number;
      photo: string;
      name: string;
      categoryId: number;
      authorId: number;
    },
    index: number
  ) {
    this.newBook = { ...book };
    this.books.splice(index, 1);
    this.openAddBookModal();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // const reader: any
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.file = file;

    if (file) {
      const fileType = file.type;

      // Ensure the selected file is an image
      if (fileType.startsWith('image/')) {
        this.uploadInProgress = true;
        this.uploadDone = false;
        this.uploadProgress = 0; 
        // Show image preview
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviewUrl = reader.result;
        };
        reader.readAsDataURL(file);

        // Simulate upload progress
        let uploadInterval = setInterval(() => {
          if (this.uploadProgress < 100) {
            this.uploadProgress += 5; // Increment progress (adjust as needed)
          } else {
            clearInterval(uploadInterval);
            this.uploadDone = true; // Mark upload as done
            this.uploadInProgress = false;
          }
        }, 100); // Adjust interval time as needed

        // Compress image
        reader.onloadend = (e: any) => {
          const image = e.target.result;
          this.imageCompress.compressFile(image, -1, 50, 50).then(
            (compressedImage: string) => {
              const compressedBlob = this.dataURItoBlob(compressedImage);

              // Convert Blob to File
              this.file = new File([compressedBlob], file.name, {
                type: file.type,
                lastModified: file.lastModified,
              });

              // After compression, complete the progress
              setTimeout(() => {
                this.uploadProgress = 100;
                clearInterval(uploadInterval);
                this.uploadDone = true;
                this.uploadInProgress = false;
              }, 1000); // Wait a bit before marking as done, for a smoother UI experience
            },
            (error: any) => {
              console.error('Image compression failed:', error);
              this.uploadInProgress = false;
            }
          );
        };
      }
    }
  }


}

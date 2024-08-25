import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../shared/services/Book/book.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { PaginateService } from '../../../shared/services/Pagination/pagination.service';
import {
  dataURItoBlob,
  handleFileInput,
} from '../../../shared/helpers/Image64.helper';
import { Book } from '../../../shared/services/Book/Book';
import { Author } from '../../../shared/services/Author/Author';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { AuthorService } from '../../../shared/services/Author/author.service';
import { CategoryService } from '../../../shared/services/Category/category.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
categories: any;
  
SelectCategory($event: Event) {
  const target = $event.target as HTMLSelectElement;
  const selectedCategoryId = target.value;
  this.newItem.categoryId = selectedCategoryId;

  

}
authors: any;
  selectedAuthor: any;
LoadAuthors() {
  console.log('LoadAuthors');
  
  this.authorService.getAuthors().then( 
    (data) => {
      this.authors = data;
      this.cdr.detectChanges();
    },
    (error) => {
      console.error('Error loading authors', error);
    }
  );
}
LoadCategories() {
  console.log('LoadCategories');
  
  this.CategoryService.getCategories().then( 
    (data) => {
      this.categories = data;
      this.cdr.detectChanges();
    },
    (error) => {
      console.error('Error loading categories', error);
    }
  );
}
SelectAuthor($event: Event) {
  const target = $event.target as HTMLSelectElement;
  const selectedAuthorId = target.value;
  this.selectedAuthor = this.authors.find(
    (author: any) => author._id === selectedAuthorId
    
  );
  if (this.selectedAuthor) {
  
      this.newItem.authorId = selectedAuthorId;
    
    
  }
}

  file: FormData | null = null;
  imagePreviewUrl: string | ArrayBuffer | null | undefined;
  emptyItem: Book = {
    name: '',
    content: 'ww',
    Rating: '1',
    Reviews: '',
    CoverPhoto: '',
    Category: null,
    categoryId: null,
    author: null,
    authorId: null,
    Year: new Date().toISOString().split('T')[0],
  };
  public newItem: Book = this.emptyItem;
  public modalAction: string = 'Add';
  public showModal = false;

  constructor(
    private BookService: BookService,
    private authorService: AuthorService,
    private cdr: ChangeDetectorRef,
    private imageCompress: NgxImageCompressService,
    protected PaginationService: PaginateService<Book>,
    private CategoryService: CategoryService
  ) {
    this.loadItems();
    this.LoadCategories();
  }

  loadItems(): void {
    this.BookService.getBooks().then((data: any[]) => {
      this.PaginationService.items = data;
      this.PaginationService.updatePaginatedItems();
    });
  }

  openModal(action: string, id?: any): void {
    this.modalAction = action;
    this.showModal = true;
    if (action === 'Edit' && id) {
      this.populateFormData(id);
    }
    this.LoadAuthors();
  }

  closeModal(): void {
    this.showModal = false;
    this.newItem = this.emptyItem;
  }

  addItem(): void {
    console.log(this.newItem);
    this.BookService.createBook(this.newItem).then((res) => {

      
      this.loadItems();
      this.closeModal();
      if (this.file) {
        this.BookService.updateBookPDF(res.id?.toString()??'NoId', this.file).then(() => {
          console.log("PDF updated successfully");
          this.loadItems();
          this.closeModal();
        });
      }
    });
  }

  editItem(id: any): void {
    

    this.BookService.updateBook(id.toString(), this.newItem).then(() => {
      this.loadItems();
      this.closeModal();
      console.log(" updated successfully");
      if (this.file) {
      this.BookService.updateBookPDF(id.toString(), this.file).then(() => {
        console.log("PDF updated successfully");
        this.loadItems();
        this.closeModal();
      });
    }
    });
    
  }

  deleteItem(id: ObjectId): void {
    this.BookService.deleteBook(id.toString()).then(() => {
      this.loadItems();
      console.log('Deleted item with ID:', id);
    });
  }

  populateFormData(id: any): void {
    const item = this.PaginationService.items.find((a) => a._id == id);
    // year only no time and month
    const year = new Date(item?.Year ?? new Date()).toISOString().split('T')[0];
    

    if (item) {
      this.newItem = { ...item, Year: year! };

      this.cdr.detectChanges();
    } else {
      console.log('Item not found with id:', id);
    }
  }

  SubmitModal(): void {
    const modalForm = document.getElementById('modalform') as HTMLElement;

    if (this.modalAction === 'Add') {
      this.addItem();
    } else if (this.modalAction === 'Edit') {
      const itemIdElement =
        modalForm.querySelector<HTMLInputElement>('#ItemId');
      if (itemIdElement) {
        const itemId = itemIdElement.value;
        this.editItem(itemId);
      } else {
        console.error('ItemId element not found');
      }
    }
    this.resetItem();

    this.BookService.refreshBooks().then(() => {
      this.closeModal();
      this.loadItems();
    });
  }

  onPDFFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    console.log("file",file);
    if (file) {
    
     const formData = new FormData();
    formData.append('file', file, file.name);
    this.file=formData;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const fileType = file.type;

      // Ensure the selected file is an image
      if (fileType.startsWith('image/')) {
        // Show image preview
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviewUrl = reader.result;
        };
        reader.readAsDataURL(file);

        // Compress image
        reader.onloadend = (e: any) => {
          const image = e.target.result;
          this.imageCompress.compressFile(image, -1, 50, 50,500,500).then(
            (compressedImage: string) => {
              const compressedBlob = dataURItoBlob(compressedImage);

              // Convert Blob to File
              handleFileInput(
                new File([compressedBlob], file.name, {
                  type: file.type,
                  lastModified: file.lastModified,
                })
              ).then((image: any) => {
                this.newItem.CoverPhoto = image;
              });
            },
            (error) => {
              console.error('Image compression failed:', error);
            }
          );
        };
      }
    }
  }
   resetItem() {
    this.newItem = this.emptyItem;

  }
}



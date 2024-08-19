import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Author } from '../../../shared/services/Author/Author';
import { AuthorService } from '../../../shared/services/Author/author.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import  {handleFileInput, dataURItoBlob} from '../../../shared/helpers/Image64.helper';
import { PaginateService } from '../../../shared/services/Pagination/pagination.service';


@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent {
  imagePreviewUrl: string | ArrayBuffer | null | undefined;
  public newItem: any = {};
  public modalAction: string = 'Add';
  public showModal = false;

  constructor(private AuthorService: AuthorService,private cdr: ChangeDetectorRef,private imageCompress: NgxImageCompressService,
     protected PaginationService: PaginateService<Author>) {
    this.loadItems();
  }

  loadItems(): void {
    this.AuthorService.getAuthors().then((data: any[]) => { 
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
  }

  closeModal(): void {
    this.showModal = false;
    this.newItem = {}; 
  }

  addItem(): void {
    this.AuthorService.createAuthor(this.newItem).then(() => {
      this.loadItems();
      this.closeModal();
    });
  }

  editItem(id: any): void {
    console.log(this.newItem.Photo);
    if (this.newItem.Photo===null) {
      //remove  that field
      delete this.newItem.Photo
      
    }
    this.AuthorService.updateAuthor(id.toString(), this.newItem).then(() => { 
      this.loadItems();
      this.closeModal();
    });
    this.newItem.Photo=null;
  }

  deleteItem(id: string): void {
    
    this.AuthorService.deleteAuthor(id).then(() => { 
      this.loadItems();
    });
  }

  populateFormData(id: any): void {
    const item = this.PaginationService.items.find(a => a._id == id)??{DateOfBirth:new Date().toISOString().split('T')[0]};
    // date only no time
    const dateOfBirth = new Date(item.DateOfBirth).toISOString().split('T')[0];

    if (item) {
      this.newItem = { ...item, DateOfBirth: dateOfBirth };

      this.cdr.detectChanges(); 
    } else {
      console.log('Item not found with id:', id);  
    }
  }

  SubmitModal(): void {
    const modalForm = document.getElementById("modalform") as HTMLElement;

    if (this.modalAction === "Add") {
      this.addItem();
    } else if (this.modalAction === "Edit") {
      const itemIdElement = modalForm.querySelector<HTMLInputElement>('#ItemId');
      if (itemIdElement) {
        const itemId = itemIdElement.value;
        this.editItem(itemId);
      } else {
        console.error('ItemId element not found');
      }
    }

    
    this.AuthorService.refreshAuthors().then(() => {
      this.closeModal();
      this.loadItems();
    });
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
          this.imageCompress.compressFile(image, -1, 50, 50).then(
            (compressedImage: string) => {
              const compressedBlob = dataURItoBlob(compressedImage);

              // Convert Blob to File
              handleFileInput( new File([compressedBlob], file.name, {
                type: file.type,
                lastModified: file.lastModified,
              })).then((image: any) => {
                this.newItem.Photo = image;
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

}

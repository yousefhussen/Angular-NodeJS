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
  formData: any;

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

  newFormData(){
    console.log("new form data",this.formData);
    
  
    this.formData = new FormData();
  
  }

  closeModal(): void {
    this.showModal = false;
    this.newItem = {}; 
    this.newFormData();
  }

  addItem(): void {
    if (!this.formData) {
      this.newFormData();
    }

    const authorJson = JSON.stringify(this.newItem);
    // const bookBlob = new Blob([bookJson], { type: 'application/json' });
    this.formData!.append('Author', authorJson!);
    // console.log(this.formData);
    this.AuthorService.createAuthor(this.formData).then((res) => {    
      this.loadItems();
      this.closeModal();
     
    });
  }

  editItem(id: any): void {
    
    if (!this.formData) {
      this.newFormData();
    }

    const authorJson = JSON.stringify(this.newItem);
    // const bookBlob = new Blob([bookJson], { type: 'application/json' });
    this.formData!.append('Author', authorJson!);
    // console.log(this.formData);
    

    this.AuthorService.updateAuthor(id.toString(), this.formData).then(() => {
      this.loadItems();
      this.closeModal();
      this.newFormData();

      console.log(" updated successfully");
    
    });
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
    const file: File = event.target.files[0];
    
    console.log("image",file);
    if (file) {
      if (!this.formData) {
        const formData = new FormData();
        formData.append('image', file, file.name);
        this.formData=formData;
      }
      else {
        this.formData.append('image', file, file.name);
      }
    
    }
  }

}

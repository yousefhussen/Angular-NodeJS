import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthorService } from '../../../shared/services/Author/author.service';
import { Author } from '../Author/Author';
import { ServiceFactory } from '../ServiceFactory';
import { NgxImageCompressService } from 'ngx-image-compress';
import { dataURItoBlob, handleFileInput } from '../../helpers/Image64.helper';
import { ObjectId } from 'mongodb';
import { Book } from '../Book/Book';


@Injectable({
  providedIn: 'root'
})
export class ModalService<T> {
  imagePreviewUrl: string | ArrayBuffer | null | undefined;
  public newItem!: T;
  public modalAction: string = 'Add';
  public showModal = false;
  private specificService: any;
  public ttype!:  () => T;
  constructor(
     private serviceFactory: ServiceFactory,
     private imageCompress: NgxImageCompressService
    ) { 

    }

    initializeService(type: string, createItem?: () => T) {
      // this.newItem = createBook();
      console.log(this.newItem);
      this.specificService = this.serviceFactory.getService(type);
    }

  populateFormData(item: T): void {

    if (item) {
      this.newItem = { ...item };

    } else {
      console.log('Item not found with', item);  
    }
  }


  openModal(action: string, id?: any): void {
    console.log(action);
    this.modalAction = action;
    this.showModal = true;
    if (action === 'Edit' && id) {

      this.populateFormData(id);
    }
  }
  closeModal(): void {
    this.showModal = false;
    
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
    this.specificService.refresh();

  }

  addItem(): void {
    console.log(this.newItem);
    this.specificService.create(this.newItem).then(() => {
 
      this.closeModal();
    });
  }


  editItem(id: any): void {


    this.specificService.update(id.toString(), this.newItem).then(() => { 

      this.closeModal();
    });
    
  }

  deleteItem(id: ObjectId): void {
   
    this.specificService.deleteBook(id.toString()).then(() => { 
    // this.loadItems();
    console.log('Deleted item with ID:', id);
    })
  
  
}
  


  handelImageField(Field: keyof T, event: any) {
    // Rest of the code...
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
                this.newItem[Field] = image;
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

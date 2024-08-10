import { Component, HostListener } from '@angular/core';
import { CategoryFormComponent } from "../category-form/category-form.component";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryFormComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

  isModalOpen = false;

  // Open the modal
  openModal() {
    this.isModalOpen = true;
    document.getElementById('categoryFormContainer')?.classList.toggle('Hidden');
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Close the modal when clicking outside of it
  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeModal();
    }
  }
}

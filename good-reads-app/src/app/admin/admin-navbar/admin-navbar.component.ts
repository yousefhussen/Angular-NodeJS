import { Component, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NavbarService } from '../../shared/services/NavBar/navbar.service';
import { NgClass, CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule, // Add this to use NgClass
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'], // Corrected to `styleUrls`
})
export class AdminNavbarComponent {
  adminForm: FormGroup;
  showModal: boolean = false;

  constructor(private fb: FormBuilder, private navbarService: NavbarService) {
    this.adminForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$'
          ),
        ],
      ],
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.adminForm.valid) {
      this.navbarService.addAdmin(this.adminForm.value).subscribe(
        (response: any) => {
          alert('Admin added successfully!');
          this.closeModal();
        },
        (error: { message: string }) => {
          alert('Error adding admin: ' + error.message);
        }
      );
    }
  }
}

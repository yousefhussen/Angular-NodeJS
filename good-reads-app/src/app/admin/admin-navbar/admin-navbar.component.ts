// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AdminService } from './admin.service'; // You'll create this service

// @Component({
//   selector: 'app-admin-navbar',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './admin-navbar.component.html',
//   styleUrl: './admin-navbar.component.css'
// })
// export class AdminNavbarComponent {
//   adminForm: FormGroup;
//   showModal: boolean = false;
//   faPlus = faPlus;

//   constructor(private fb: FormBuilder, private adminService: AdminService) {
//     this.adminForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', [
//         Validators.required,
//         Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$')
//       ]]
//     });
//   }

//   openModal() {
//     this.showModal = true;
//   }

//   closeModal() {
//     this.showModal = false;
//   }

//   onSubmit() {
//     if (this.adminForm.valid) {
//       this.adminService.addAdmin(this.adminForm.value).subscribe(
//         response => {
//           alert('Admin added successfully!');
//           this.closeModal();
//         },
//         error => {
//           alert('Error adding admin: ' + error.message);
//         }
//       );
//     }
//   }
// }
// }

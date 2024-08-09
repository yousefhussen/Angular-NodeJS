import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user/User'; // Adjust the path as needed
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  uploadInProgress: boolean = false;
  uploadProgress: number = 0;
  uploadDone: boolean = false;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  user: User; // Declare a variable of type User

  constructor(private fb: FormBuilder, private router: Router, private UserService: UserService) {
    this.registerForm = this.fb.group(
      {
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: [''],
        password: [
          ''
        ],
        confirmPassword: [''],
        image: [''],
      },
      { validators: this.passwordMatchValidator }
    );

    // Initialize the user instance
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      profilePic: null,
    };
  }

  ngOnInit() {
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });

    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mustMatch: true };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const fileType = file.type;

      // Ensure the selected file is an image
      if (fileType.startsWith('image/')) {
        this.uploadInProgress = true;
        this.uploadDone = false;

        // Show image preview
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviewUrl = reader.result;
        };
        reader.readAsDataURL(file);

        // Simulate upload progress
        const uploadInterval = setInterval(() => {
          if (this.uploadProgress < 100) {
            this.uploadProgress += 10; // Increment progress by 10%
          } else {
            clearInterval(uploadInterval);
            this.uploadInProgress = false;
            this.uploadDone = true;
          }
        }, 200); // Simulated upload speed
      } else {
        alert('Please upload a valid image file.');
        this.registerForm.get('image')?.reset(); // Reset the file input
        this.imagePreviewUrl = null; // Clear the preview
      }
    }
  }

  removeImage() {
    this.registerForm.get('image')?.reset(); // Reset the file input
    this.imagePreviewUrl = null; // Clear the preview
    this.uploadProgress = 0; // Reset progress bar
    this.uploadDone = false; // Reset the upload status
  }

  register() {
    if (this.registerForm.valid) {
      // Populate the user instance with form values
      this.user = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        profilePic: null,
      };

      // Perform registration logic here
      this.UserService.createEmployee(this.user).subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      })

    } else {
      Object.keys(this.registerForm.controls).forEach((controlName) => {
        const control = this.registerForm.get(controlName);
        if (control?.invalid) {
          console.log(`Control ${controlName} is invalid:`);
          console.log(control.errors);
        }
      });
      console.log('Form is invalid');
    }
  }
}
    
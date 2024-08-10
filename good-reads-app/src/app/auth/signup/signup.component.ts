import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/services/User/User'; // Adjust the path as needed
import { UserService } from '../../shared/services/User/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  uploadInProgress: boolean = false;
  file!: File;
  uploadProgress: number = 0;
  uploadDone: boolean = false;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  user: User; // Declare a variable of type User

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UserService: UserService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$'
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );

    // Initialize the user instance
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      profilePic: '',
    };
  }

  ngOnInit() {
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
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
    this.file = file;
    console.log(this.file);

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

  handleFileInput(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (file != null) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const binaryString = event.target.result;
          const base64String = btoa(binaryString);
          resolve(base64String);
        };
        reader.readAsBinaryString(file);
      } else {
        reject('Error: File input is null or undefined');
      }
    });
  }

  removeImage() {
    this.registerForm.get('image')?.reset(); // Reset the file input
    this.imagePreviewUrl = null; // Clear the preview
    this.uploadProgress = 0; // Reset progress bar
    this.uploadDone = false; // Reset the upload status
  }

  async register() {
    if (this.registerForm.valid) {
      const reader = new FileReader();
      // Populate the user instance with form values
      this.user = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        profilePic: await this.handleFileInput(this.file).then((res) => res),
      };

      // Perform registration logic here
      this.UserService.createUser(this.user);
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

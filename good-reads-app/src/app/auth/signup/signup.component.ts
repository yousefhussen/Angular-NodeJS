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
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  uploadInProgress: boolean = false;
  file!: File | null;
  uploadProgress: number = 0;
  uploadDone: boolean = false;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  user: User; // Declare a variable of type User

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UserService: UserService,
    private imageCompress: NgxImageCompressService
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
            (error) => {
              console.error('Image compression failed:', error);
              this.uploadInProgress = false;
            }
          );
        };
      }
    }
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  async register() {
    if (this.registerForm.valid) {
      this.user = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        profilePic: await this.handleFileInput(this.file!),
      };

      // Perform registration logic here
      this.UserService.createUser(this.user).then(response=>{
        console.log(response);
        if (response) {
          sessionStorage.setItem("token",response.token);
          this.router.navigate(['main/']);
        }
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

  removeImage() {
    this.imagePreviewUrl = null;
    this.file = null;
    this.uploadDone = false;
    this.uploadProgress = 0;

    // Optionally, clear the file input field
    this.registerForm.get('image')?.reset();
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
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {


registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        addresses: this.fb.array([this.createAddress()]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });

    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  get addresses(): FormArray {
    return this.registerForm.get('addresses') as FormArray;
  }

  addressControls() {
    return this.addresses.controls;
  }

  createAddress(): FormGroup {
    return this.fb.group({
      address: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]*$/)],
      ],
      street: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]*$/)],
      ],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      country: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
    });
  }

  addAddress() {
    this.addresses.push(this.createAddress());
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mustMatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;

      // Store user data in local storage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ username, email, password });
      localStorage.setItem('users', JSON.stringify(users));

      // Store the latest registered user as logged in
      localStorage.setItem('loggedInUser', JSON.stringify({ username, email }));

      // Navigate to the profile page after successful registration
      this.router.navigate(['/profile']);
    } else {
      console.log('Form is invalid');
    }
  }
}

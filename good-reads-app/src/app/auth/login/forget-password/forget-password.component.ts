import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  form!: HTMLFormElement;
  UserService!: UserService;
  router!: Router;

  constructor(UserService: UserService, router: Router) {
    this.UserService = UserService;
    this.router = router;
  }
  ngOnInit(): void {
    this.form = document.getElementById(
      'forgotPasswordForm'
    ) as HTMLFormElement;
  }
  onSubmit($event: Event): void {
    event?.preventDefault();
    console.log('Form submitted:', this.form['email'].value);
    if (this.form) {
      this.UserService.ForgetPasswordRequest(this.form['email'].value).then(
        (User) => {
          if (User) {
            console.log(User.email);

            this.router.navigate(['/auth/reset-password/' + User.email]);
          } else {
            alert('Email not found');
          }
        }
      );
      console.log('Form submitted:', this.form['email'].value);
    } else {
      console.error('Form not found');
    }
  }
}

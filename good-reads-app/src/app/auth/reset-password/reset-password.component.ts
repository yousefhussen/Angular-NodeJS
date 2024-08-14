import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/User/user.service';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  email: any;
  UserService!: UserService;
  Form!: HTMLFormElement;

  constructor(private route: ActivatedRoute, UserService: UserService) {
    this.UserService = UserService;

    this.email = this.route.snapshot.queryParamMap.get('email');
    this.Form = document.getElementById(
      'resetPasswordForm2'
    ) as HTMLFormElement;
  }

  ResetPassword(form: NgForm) {
    this.UserService.ResetPassword(this.email, form.value.password).then(
      (response) => {
        console.log(response);
      }
    );
  }
}

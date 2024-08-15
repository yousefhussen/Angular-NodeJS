import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UserService } from '../../shared/services/User/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  // standalone: false,
  // imports: [BrowserModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
onSubmit($event: Event, form: HTMLFormElement) {
  $event.preventDefault();
  console.log('Form submitted:', form['email'].value);
  console.log('Form submitted:', form['password'].value);
  this.UserService.login(form['email'].value, form['password'].value).then(
    (response: any) => {
 
      sessionStorage.setItem('token', response.token);
      console.log(response.User);
      sessionStorage.setItem('User', JSON.stringify(response.User));
      window.location.href = '/';

    }
  )

}
  constructor(private modalService: NgbModal , private UserService: UserService, private router: Router) {

  }

}

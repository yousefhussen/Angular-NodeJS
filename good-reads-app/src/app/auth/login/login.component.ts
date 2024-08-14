import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
@Component({
  selector: 'app-login',
  // standalone: false,
  // imports: [BrowserModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private modalService: NgbModal) {}
}

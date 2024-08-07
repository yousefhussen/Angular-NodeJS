// app.component.ts
import { Component } from '@angular/core';
import { LoginPanelComponent } from './admin/login-panel/login-panel.component';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [LoginPanelComponent, RouterModule, HomeComponent],
})
export class AppComponent {
  constructor(private router: Router) {}

  login() {
    console.log(this.router.config);
    this.router.navigate(['auth/login']);
  }
  title = 'good-reads-app';
}

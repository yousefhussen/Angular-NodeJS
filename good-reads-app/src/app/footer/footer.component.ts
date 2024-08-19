import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true
})
export class FooterComponent {

username: any;
logout() {
throw new Error('Method not implemented.');
}
constructor(protected router: Router) { }

}

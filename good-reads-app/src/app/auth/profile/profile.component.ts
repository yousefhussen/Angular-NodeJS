import { Component } from '@angular/core';
import { User } from '../../shared/services/User/User';
import { UserService } from '../../shared/services/User/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile!: User | null;

  constructor(UserService: UserService) { 
    const jsonString = sessionStorage.getItem('User');
    const UserObject: User = JSON.parse(jsonString??'{}');
    UserService.getUser((UserObject._id ?? '').toString()).then((user) => {
      this.profile = user;
    });
  }
}
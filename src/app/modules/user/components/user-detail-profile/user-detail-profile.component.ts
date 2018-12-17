import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-user-detail-profile',
  templateUrl: './user-detail-profile.component.html',
  styleUrls: ['./user-detail-profile.component.css']
})
export class UserDetailProfileComponent implements OnInit {
  user: User
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.decodeToken()
  }

}

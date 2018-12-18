import { Component, OnInit } from '@angular/core';
import { onSubmit } from '../../types/onSubmit.type';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail-add',
  templateUrl: './user-detail-add.component.html',
  styleUrls: ['./user-detail-add.component.css']
})
export class UserDetailAddComponent implements OnInit {
  onSubmitFunc: onSubmit = (
    username: string,
    email: string,
    role: string,
    image: Blob,
    password: string) => this.userService.addUser(username, email, role, image, password)

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}

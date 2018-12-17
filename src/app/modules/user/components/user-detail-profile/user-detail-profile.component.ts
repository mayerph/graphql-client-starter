import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { LoaderService } from 'src/app/modules/loader/services/loader.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/modules/message/services/message.service';

@Component({
  selector: 'app-user-detail-profile',
  templateUrl: './user-detail-profile.component.html',
  styleUrls: ['./user-detail-profile.component.css']
})
export class UserDetailProfileComponent implements OnInit {
  user: User
  constructor(
    private loaderService: LoaderService,
    private userService: UserService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser()
  }

  getUser(): void {
    const id = this.authService.decodeToken()._id
    if (id) {
      this.loaderService.changeLoader(true)
      this.userService.getUser(id)
      .subscribe(
        user => {
          this.loaderService.changeLoader(false)
          this.user = user
        },
        error => {
          this.loaderService.changeLoader(true)
          this.messageService.createMessage(error)
        }
      )
    }
  }

}

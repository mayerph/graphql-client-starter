import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { LoaderService } from 'src/app/modules/loader/services/loader.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/modules/role/models/role.model';
import { MessageService } from 'src/app/modules/message/services/message.service';

@Component({
  selector: 'app-user-detail-admin',
  templateUrl: './user-detail-admin.component.html',
  styleUrls: ['./user-detail-admin.component.css']
})
export class UserDetailAdminComponent implements OnInit {
  user: User
  selectedRole: string
  url: any

  constructor(
    private loaderService: LoaderService,
    private userService: UserService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loaderService.changeLoader(true)
      this.userService.getUser(id)
      .subscribe(
        user => {
          this.loaderService.changeLoader(false)
          this.user = user
          this.selectedRole = this.user.role.id
          if (this.user.img !== null) {
            this.url = this.user.img.source
          }
        },
        error => {
          this.loaderService.changeLoader(true)
          this.messageService.createMessage(error)
        }
      )
    }
  }

}
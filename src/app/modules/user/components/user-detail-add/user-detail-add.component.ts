import { Component, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { LoaderService } from 'src/app/modules/loader/services/loader.service'
import { MessageService } from 'src/app/modules/message/services/message.service'
import { UserForm } from '../../models/userForm.interface'

@Component({
    selector: 'app-user-detail-add',
    templateUrl: './user-detail-add.component.html',
    styleUrls: ['./user-detail-add.component.css'],
})
export class UserDetailAddComponent implements OnInit {
    routeBack = '/user-admin'
    submitFunc(userForm: UserForm) {
        const { username, email, role, img, password } = userForm
        this.loaderService.changeLoader(true)
        this.userService
            .addUser(username, email, role, img, password)
            .subscribe(
                data => {
                    this.loaderService.changeLoader(false)
                    this.router.navigateByUrl(this.routeBack)
                },
                error => {
                    this.loaderService.changeLoader(false)
                    this.messageService.createMessage(error)
                    throw error
                }
            )
    }

    constructor(
        private userService: UserService,
        private loaderService: LoaderService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {}
}

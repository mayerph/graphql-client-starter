import { Component, OnInit } from '@angular/core'
import { User } from '../../models/user.model'
import { LoaderService } from 'src/app/modules/loader/services/loader.service'
import { UserService } from '../../services/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Role } from 'src/app/modules/role/models/role.model'
import { MessageService } from 'src/app/modules/message/services/message.service'
import { onSubmit } from '../../types/onSubmit.type'
import { UserForm } from '../../models/userForm.interface'

@Component({
    selector: 'app-user-detail-admin',
    templateUrl: './user-detail-admin.component.html',
    styleUrls: ['./user-detail-admin.component.css'],
})
export class UserDetailAdminComponent implements OnInit {
    routeBack = '/user-admin'
    user: User

    constructor(
        private loaderService: LoaderService,
        private userService: UserService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getUser()
    }

    submitFunc(userForm: UserForm) {
        const {
            username,
            email,
            role,
            img,
            password,
            deleteImage,
            id,
        } = userForm
        this.loaderService.changeLoader(true)
        this.userService
            .updateUser(username, email, role, img, password, deleteImage, id)
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

    getUser(): void {
        const id = this.route.snapshot.paramMap.get('id')
        if (id) {
            this.loaderService.changeLoader(true)
            this.userService.getUser(id).subscribe(
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

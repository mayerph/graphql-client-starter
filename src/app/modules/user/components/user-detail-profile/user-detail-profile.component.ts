import { Component, OnInit } from '@angular/core'
import { User } from '../../models/user.model'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { LoaderService } from 'src/app/modules/loader/services/loader.service'
import { UserService } from '../../services/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageService } from 'src/app/modules/message/services/message.service'
import { onSubmit } from '../../types/onSubmit.type'
import { UserForm } from '../../models/userForm.interface'

@Component({
    selector: 'app-user-detail-profile',
    templateUrl: './user-detail-profile.component.html',
    styleUrls: ['./user-detail-profile.component.css'],
})
export class UserDetailProfileComponent implements OnInit {
    routeBack = '/'
    user: User

    constructor(
        private loaderService: LoaderService,
        private userService: UserService,
        private messageService: MessageService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getUser()
    }

    submitFunc(userForm: UserForm) {
        const { username, email, role, img, password, deleteImage } = userForm
        this.loaderService.changeLoader(true)
        this.userService
            .updateProfile(username, email, role, img, password, deleteImage)
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
        const id = this.authService.decodeToken()._id
        if (id) {
            this.loaderService.changeLoader(true)
            this.userService.getProfile().subscribe(
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

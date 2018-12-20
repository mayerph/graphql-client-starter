import { Component, OnInit } from '@angular/core'
import { User } from '../../models/user.model'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { LoaderService } from 'src/app/modules/loader/services/loader.service'
import { UserService } from '../../services/user.service'
import { ActivatedRoute } from '@angular/router'
import { MessageService } from 'src/app/modules/message/services/message.service'
import { onSubmit } from '../../types/onSubmit.type'

@Component({
    selector: 'app-user-detail-profile',
    templateUrl: './user-detail-profile.component.html',
    styleUrls: ['./user-detail-profile.component.css'],
})
export class UserDetailProfileComponent implements OnInit {
    routeBack = '/'
    user: User
    onSubmitFunc: onSubmit = (
        username: string,
        email: string,
        role: string,
        image: Blob,
        password: string,
        deleteImage: boolean
    ) =>
        this.userService.updateProfile(
            username,
            email,
            role,
            image,
            password,
            deleteImage
        )

    constructor(
        private loaderService: LoaderService,
        private userService: UserService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.getUser()
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

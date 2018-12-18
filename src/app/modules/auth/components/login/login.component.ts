import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth/auth.service'
import { LoaderService } from 'src/app/modules/loader/services/loader.service'
import { Router } from '@angular/router'
import { MessageService } from 'src/app/modules/message/services/message.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup

    constructor(
        private authService: AuthService,
        private loaderService: LoaderService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.createForm()
    }

    createForm(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', {
                validators: [Validators.required],
            }),
            password: new FormControl('', {
                validators: [Validators.required],
            }),
        })
    }

    onSubmit() {
        this.loaderService.changeLoader(true)
        this.authService
            .signin(
                this.loginForm.controls.username.value,
                this.loginForm.controls.password.value
            )
            .subscribe(
                token => {
                    this.loaderService.changeLoader(false)
                    this.router.navigateByUrl('/')
                },
                error => {
                    this.loaderService.changeLoader(false)
                    this.messageService.createMessage(error)
                    throw error
                }
            )
    }
}

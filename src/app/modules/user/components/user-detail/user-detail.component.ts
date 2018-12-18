import {
    Component,
    OnInit,
    Input,
    ChangeDetectorRef,
    AfterViewChecked,
} from '@angular/core'
import { UserService } from '../../services/user.service'
import { User } from '../../models/user.model'
import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common'
import { RoleService } from '../../../role/services/role.service'
import { Role } from '../../../role/models/role.model'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoaderService } from 'src/app/modules/loader/services/loader.service'
import { MessageService } from 'src/app/modules/message/services/message.service'
import { onSubmit } from '../../types/onSubmit.type'

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, AfterViewChecked {
    @Input() user: User
    @Input() userImageUrl: string
    @Input() onSubmitFunc: onSubmit
    @Input() routeBack: string
    selectedRole: string
    roles: Role[]
    userForm: FormGroup
    defaultUrl = 'assets/user/img/userImage_default.png'
    url: any
    image: any
    editUser: boolean
    passwordPlacholder = '1234'

    constructor(
        private loaderService: LoaderService,
        private location: Location,
        private roleService: RoleService,
        private messageService: MessageService,
        private router: Router,
        private cdRef: ChangeDetectorRef
    ) {}

    ngAfterViewChecked() {
        if (this.user) {
            this.cdRef.detectChanges()
        }
    }

    ngOnInit() {
        this.getData()
        this.createForm()
    }

    createForm(): void {
        this.userForm = new FormGroup({
            id: new FormControl(
                { value: '', disabled: true },
                {
                    validators: [Validators.required],
                }
            ),
            username: new FormControl('', {
                validators: [Validators.required],
            }),
            email: new FormControl('', {
                validators: [Validators.required, Validators.email],
            }),
            role: new FormControl('', {
                validators: [Validators.required],
            }),
            password: new FormControl(''),
            image: new FormControl(null),
        })
    }
    setUserValues() {
        this.userForm.patchValue({
            id: this.user.id,
            username: this.user.username,
            email: this.user.email,
            role: this.user.role.id,
        })
    }

    async getData() {
        await this.getRoles()
        this.manageUser()
    }

    manageUser(): void {
        if (this.user) {
            this.selectedRole = this.user.role.id
            if (this.user.img) {
                this.url = this.user.img.source
            } else {
                this.url = this.defaultUrl
            }
            this.setUserValues()
        }
    }

    getRoles(): void {
        this.roleService.getRoles().subscribe(roles => {
            this.roles = roles
        })
    }

    goBack(): void {
        this.location.go('/user-admin')
        this.location.back()
    }

    changeState(image) {
        this.image = image
        this.userForm.controls.image.markAsTouched()
    }
    resetPassword(isChecked) {
        if (isChecked) {
            this.userForm.controls.password.setValidators([Validators.required])
        } else {
            this.userForm.controls.password.clearValidators()
            this.userForm.controls.password.markAsUntouched()
            this.userForm.controls.password.reset()
        }
    }

    onSubmit(): void {
        this.loaderService.changeLoader(true)
        if (this.userForm.touched) {
            const id = this.user ? this.userForm.controls.id.value : null
            const username = this.userForm.controls.username.touched
                ? this.userForm.controls.username.value
                : null
            const email = this.userForm.controls.email.touched
                ? this.userForm.controls.email.value
                : null
            const role = this.userForm.controls.role.touched
                ? this.userForm.controls.role.value
                : null

            const img =
                this.userForm.controls.image.touched && this.image
                    ? this.image
                    : null

            const deleteImage =
                this.userForm.controls.image.touched && !this.image

            const password = this.userForm.controls.password.touched
                ? this.userForm.controls.password.value
                : null

            this.onSubmitFunc(
                username,
                email,
                role,
                img,
                password,
                deleteImage,
                id
            ).subscribe(
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
    }
}

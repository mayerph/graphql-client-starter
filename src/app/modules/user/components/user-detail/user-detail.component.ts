import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, getLocaleDateFormat } from '@angular/common';
import { RoleService } from '../../../role/services/role.service';
import { Role } from '../../../role/models/role.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactNativeFile } from 'apollo-upload-file'
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from 'src/app/modules/loader/services/loader.service';
import { MessageService } from 'src/app/modules/message/services/message.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Input() roles: Role[];
  @Input() selectedRole: string;
  userForm: FormGroup;
  url: any = 'http://127.0.0.1:8000/static/images/user/userImage_default.png'
  image: any
  editUser: boolean
  passwordPlacholder = '1234'

  constructor(
    private loaderService: LoaderService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private roleService: RoleService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData()
    this.createForm()
  }

  createForm(): void {
    this.userForm = new FormGroup({
      id: new FormControl({value: '', disabled: true}, {
        validators: [Validators.required],
      }),
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email] 
      }),
      role: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      }),
      image: new FormControl(null)

    });
  }
  setUserValues(user: User) {
    this.userForm.patchValue({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role.id
    })
  }

  getData() {
    this.getUser()
    this.getRoles()
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loaderService.toggleLoader()
      this.editUser = true
      this.userService.getUser(id)
      .subscribe(
        user => {
          this.loaderService.toggleLoader()
          this.user = user
          this.selectedRole = this.user.role.id
          this.setUserValues(this.user)
          if (this.user.img !== null) {
            this.url = this.user.img.source
          }
        },
        error => {
          this.loaderService.toggleLoader()
          this.messageService.createMessage(error)
        }
      )
    }
  }

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

  goBack(): void {
    this.location.go('/user-admin')
    this.location.back()
  }

  changeState(image) {
    this.image = image
    this.userForm.controls.image.markAsTouched()
  }

  onSubmit(): void {
    this.loaderService.toggleLoader()
    if (this.userForm.touched) {
      const id = this.editUser ? this.userForm.controls.id.value : null
      const username =
        this.userForm.controls.username.touched ?  this.userForm.controls.username.value : null;
      const email =
        this.userForm.controls.email.touched ?  this.userForm.controls.email.value : null;
      const role =
        this.userForm.controls.role.touched ?  this.userForm.controls.role.value : null;
      const img =
        this.userForm.controls.image.touched ?  this.image : null;
      const password =
        this.userForm.controls.password.touched ?  this.userForm.controls.password.value : null;

      if (this.editUser) {
        this.userService.updateUser(id, username, email, role, img, password).subscribe(
          data => {
            this.loaderService.toggleLoader()
            this.router.navigateByUrl('/user-admin')
          },
          error => {
            this.loaderService.toggleLoader()
            this.messageService.createMessage(error)
            throw error
          })
      } else {
        this.userService.addUser(username, email, role, img, password).subscribe(
          data => {
            this.loaderService.toggleLoader()
            this.router.navigateByUrl('/user-admin')
          },
          error => {
            this.loaderService.toggleLoader()
            this.messageService.createMessage(error)
            throw error
          })
      }
    }
  }
}

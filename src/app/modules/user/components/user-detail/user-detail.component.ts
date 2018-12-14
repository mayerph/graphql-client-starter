import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location, getLocaleDateFormat } from '@angular/common';
import { RoleService } from '../../../role/services/role.service';
import { Role } from '../../../role/models/role.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactNativeFile } from 'apollo-upload-file'
import { DomSanitizer } from '@angular/platform-browser';


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

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private roleService: RoleService
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
      image: new FormControl(null)

    });
  }
  setUserValues(user: User) {
    this.userForm.patchValue({
      id: user.id,
      username: user.username,
      email: user.email,
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
      this.editUser = true
      this.userService.getUser(id)
      .subscribe((user) => {
        this.user = user
        this.selectedRole = this.user.role.id
        this.setUserValues(this.user)
        this.url = this.user.img !== null ? this.user.img.source : ''
      })
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
      
      this.editUser
        ? this.userService.updateUser(id, username, email, role, img)
        : this.userService.addUser(username, email, role, img)
    }
  }
}

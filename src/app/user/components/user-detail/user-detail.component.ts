import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location, getLocaleDateFormat } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';
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
  url: any
  image: any

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private roleService: RoleService,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer
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
    this.userService.getUser(id)
      .subscribe((user) => {
        this.user = user
        this.selectedRole = this.user.role.id
        this.setUserValues(this.user)
        this.url = user.img.source || ''
      })
  }

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

  goBack(): void {
    this.location.go('/user-admin')
    this.location.back()
  }

  onSubmit() {
    //this.userForm.controls.username.touched
    console.log(this.userForm.controls.image.touched)
    if (this.userForm.touched) {
      const id = this.userForm.controls.id.value
      const username =
        this.userForm.controls.username.touched ?  this.userForm.controls.username.value : null;
      const email =
        this.userForm.controls.email.touched ?  this.userForm.controls.email.value : null;
      const role =
        this.userForm.controls.role.touched ?  this.userForm.controls.role.value : null;
      const img =
        this.userForm.controls.image.touched ?  this.image : null;
      this.userService.updateUser(id, username, email, role, img)
    }
  }

  onSelectFile(event) {
    //this.image = new Blob(['Foo.'], { type: 'text/plain' })
    if (event.target.files && event.target.files[0]) {
      //this.image = new Blob([event.target.files[0]], { type: 'image/png' })
      const reader = new FileReader();
      reader.onload = (event: any) => {
        /*this.userForm.controls.image.markAsTouched()
        const result = event.target.result.split(',')
        const mimeType = result[0].split(':')[1].split(';')[0]
        const base64 = event.target.result.split(',')[1]
        this.image = new Blob([window.atob(base64)], { type: 'image/png' })*/
        this.userForm.controls.image.markAsTouched()
        const arrayBuffer = event.target.result;
        const imageData = new Blob([arrayBuffer] , {type: 'image/png' });

        this.image = imageData
        this.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageData));
      }
      reader.readAsArrayBuffer(event.target.files[0]);
    }
  }

}

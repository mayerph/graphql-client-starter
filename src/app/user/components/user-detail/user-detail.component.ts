import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location, getLocaleDateFormat } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
      })

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
    if (this.userForm.touched) {
      const id = this.userForm.controls.id.value
      const username =
        this.userForm.controls.username.touched ?  this.userForm.controls.username.value : null;
      const email =
        this.userForm.controls.email.touched ?  this.userForm.controls.email.value : null;
      const role =
        this.userForm.controls.role.touched ?  this.userForm.controls.role.value : null;
      this.userService.updateUser(id, username, email, role)
    }
  }

}

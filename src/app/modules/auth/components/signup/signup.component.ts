import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderService } from 'src/app/modules/loader/services/loader.service';
import { MessageService } from 'src/app/modules/message/services/message.service';
import { Router } from '@angular/router';

const moment = _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class SignupComponent implements OnInit {
  //date = new FormControl(moment());
  maxDate = moment().subtract(18, 'days').calendar();
  signupForm: FormGroup;
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] }),
      birthday: new FormControl(moment(), { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    this.loaderService.changeLoader(true)
    this.authService.signup(
      this.signupForm.controls.username.value,
      this.signupForm.controls.email.value,
      this.signupForm.controls.password.value
    ).subscribe(
      token => {
        this.loaderService.changeLoader(false)
        this.router.navigateByUrl('/')
      },
      error => {
        this.loaderService.changeLoader(false)
        this.messageService.createMessage(error)
        throw error
      })
  }

}

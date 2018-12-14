import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderService } from 'src/app/modules/loader/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
 
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}
 
  ngOnInit() {
    this.createForm()
    
  }

  createForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required]
        //validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    })
  }

  onSubmit() {
    this.loaderService.toggleLoader()
    this.authService.signin(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value,
    ).subscribe((token) => {
      this.loaderService.toggleLoader()
    })
  }

}

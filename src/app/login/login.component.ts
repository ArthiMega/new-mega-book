import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message!: string;
  login: FormGroup | any;
  public showPassword: boolean = false;
  public showPasswordONPress!: boolean;
  constructor(
    private route: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.auth.isLoggedIn()) {
      this.route.navigate(['home']);
    }
  }
  logindata(login: FormGroup) {
    this.auth.login(this.login.value.email, this.login.value.password);
    this.message = this.auth.message
  }
}

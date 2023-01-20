import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication.service';
import { NavService } from '../service/nav.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  position = "center";
  visible = false;
  percentage = 0;
  visitor :string ="user";
  login:FormGroup|any;
  constructor(
     private route:Router, 
     private auth:AuthService, 
     private formBuilder:FormBuilder,
     ) {
   }
  ngOnInit() {
    this.login = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
    if(this.auth.isLoggedIn()){
      this.route.navigate(['home']);
    }
  }
  logindata(login:FormGroup){
      this.auth.login(this.login.value.email,this.login.value.password);  
  }
}

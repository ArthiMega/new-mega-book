import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication.service';
import { CRUDService } from '../service/crud.service';
import { NavService } from '../service/nav.service';
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
  constructor(private http:HttpClient,
     private route:Router, 
     private service: CRUDService,
     public nav: NavService,
     private auth:AuthService, 
     ) {
    this.nav.hide()
   }
   
  ngOnInit() {
    this.login = new FormGroup({
      'email': new FormControl(),
      'password': new FormControl(),
    });
    if(this.auth.isLoggedIn()){
      this.route.navigate(['home']);
    }
    if(this.visitor === "admin"){
      this.route.navigate(['admin']);
    }
  }
  

  logindata(login:FormGroup){
      this.auth.login(this.login.value.email,this.login.value.password);  
  }
}

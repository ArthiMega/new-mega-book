import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../service/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from './registration.model';
import { Router } from '@angular/router';
import { NavService } from '../service/nav.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  formValue !: FormGroup;
  registrationModelObj : RegistrationModel = new RegistrationModel();
  userData !:any;

  constructor(private formbuilder:FormBuilder,
    private crudservice: CRUDService, 
    private route:Router, public nav:NavService ,private toastr:ToastrService) {
   }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name:['',Validators.required],
      email:['', Validators.required],
      password:['',Validators.required,Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})')],
      conformpassword:['',Validators.required]
    },
    {
      validator:this.mustMatch('password','confirmPassword')
    })
  }  
  mustMatch(password:string, confirmPassword:string):any{
    if(password !== confirmPassword){
      return true;
    }
    else
      return false
  }
  
  postUserDetails(){
    this.registrationModelObj.name = this.formValue.value.name;
    this.registrationModelObj.email = this.formValue.value.email;
    this.registrationModelObj.password = this.formValue.value.password;
    this.registrationModelObj.confirmpassword = this.formValue.value.confirmpassword;
    this.crudservice.postUser(this.registrationModelObj)
      .subscribe(
        res =>{
        this.formValue.reset();
        this.toastr.success("Registerd successfully")
        this.route.navigate(['dashboard']);
      },
      error =>{
        this.toastr.error("somthing went wrong!")
      })
  }
  getAllUsers(){
    this.crudservice.getUserInfo().subscribe(res=>{
      this.userData = res;
    })
  }
}

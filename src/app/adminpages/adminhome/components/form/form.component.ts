import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators, FormControl } from '@angular/forms';
import { CRUDService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';
import { FormModule1 } from './form.module';
import { AuthService } from 'src/app/service/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formValue !: FormGroup;
  formModuleObj :FormModule1 = new FormModule1();
  bookDetails!:any;

  constructor(private formBuilder:FormBuilder, 
              private crudservice:CRUDService,
              private router:Router,
              private auth:AuthService,
              private toastr :ToastrService) {
                
                }

  ngOnInit() {
    if(!this.auth.isAdmin()){
      this.router.navigate(['../home'])
    }
    this.formValue = this.formBuilder.group({
      coverpage:['',Validators.required],
      bookname:['',Validators.required],
      author:['',Validators.required],
      price:['',Validators.required],
      about:['',Validators.required],
    });
    
  }
  postBookDetails(){
    this.formModuleObj.img = this.formValue.value.coverpage;
    this.formModuleObj.name = this.formValue.value.bookname;
    this.formModuleObj.author = this.formValue.value.author;
    this.formModuleObj.price = this.formValue.value.price;
    this.formModuleObj.about = this.formValue.value.about;
    this.crudservice.postBooks(this.formModuleObj).subscribe(
      response=>{
        console.log(response);
        this.formValue.reset();
        this.toastr.success("book details added!")
        this.router.navigate(['/adminpages/editbooks'])
      },
      error=>{
        this.toastr.error("somthing went wrong!");
      });  
  }
}

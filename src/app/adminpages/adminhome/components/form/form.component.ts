import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators, FormControl } from '@angular/forms';
import { CRUDService } from 'src/app/service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  formModuleObj: FormModule1 = new FormModule1();
  bookDetails!: any;
  public obj: any = {};
  isAddMode!:boolean;
  id:any;
  constructor(private formBuilder: FormBuilder,
    private crudservice: CRUDService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
    private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (!this.auth.isAdmin()) {
      this.router.navigate(['../home'])
    }
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      about: ['', Validators.required],
      file: ['', Validators.required]
    });
    if(!this.isAddMode){
      this.crudservice.getIndividualBook(this.id).subscribe((result:any)=>{
        this.formValue.patchValue(result)
      })
    }
  }

  onFileSelect(input: any) {
    console.log(input.files);
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.obj.img = event.target.result;
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  postBookDetails() {
    this.obj = { ...this.formValue.value, ...this.obj };
    this.crudservice.postBooks(this.obj).subscribe(
      response => {
        this.formValue.reset();
        this.toastr.success("book details added Successfully")
        this.router.navigate(['/adminpages/editbooks'])
      },
      error => {
        this.toastr.error("somthing went wrong!");
      });
  }
  updateBook(){
    this.obj = { ...this.formValue.value, ...this.obj };
    this.crudservice.updateBook(this.id,this.obj).subscribe(()=>{
      this.toastr.success("Book details updated successfully!");
      this.router.navigate(['/adminpages/editbooks'])
    })
  }
  onSubmit(){
    if(this.isAddMode){
      this.postBookDetails();
    }
    else{
      this.updateBook();
    }
  }
}

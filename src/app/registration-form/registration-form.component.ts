import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDService } from '../service/crud.service';
import { MustMatch } from './must-match';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls:['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registerForm!: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder,
                private crudService:CRUDService, 
                private toastr:ToastrService,
                private router :Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({  
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6),Validators.pattern("^[a-zA-Z0-9]+$")]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        }, {
            validators: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.crudService.postUser(this.registerForm.value).subscribe(
            res=>{
                this.registerForm.reset();
                this.toastr.success("Registered successfully!","User");
                this.router.navigate(['home']);
            },
            error=>{
                this.toastr.error("Somethig went wrong");
            }
        )
        // display form values on success
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}

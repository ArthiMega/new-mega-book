import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../service/crud.service';
import { Observable } from 'rxjs';
import { AuthService } from '../service/authentication.service';
import { FormControl , FormGroup} from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  name = new FormControl('');
  individualUser!: any
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address:new FormGroup({
      street: new FormControl(''),
      city:new FormControl(''),
      state:new FormControl(''),
      country: new FormControl('')
    })
  });
  constructor(private auth: AuthService) { }
  ngOnInit() {
    this.getindividualUser();
  }
  getindividualUser() {
    this.auth.getIndividualUser().subscribe(data => {
      this.individualUser = data;
    })
  }
  updateName(){
    this.name.setValue('Arthi');
  }
  onSubmit(){
    console.warn("updated successfully!", this.profileForm.value);
  }
  updateProfile(){
    this.profileForm.patchValue({
      firstName:'Arthi',
      address:{
        street:'31, west street puliyur'
      }
    })
  }
}




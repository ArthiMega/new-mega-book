import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../service/crud.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
   userData!:any;
  constructor(private crudservice: CRUDService) { }

  ngOnInit() {
  }
  getAllUsers(){
    this.crudservice.getUserInfo()
    .subscribe(res=>{
      this.userData = res;
    })
  }
}

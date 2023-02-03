import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CRUDService } from '../service/crud.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  userData!: any;
  constructor(private crudservice: CRUDService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }
  getAllUsers() {
    this.crudservice.getUserInfo()
      .subscribe(res => {
        this.userData = res;
      },
      error=>{
        this.toastr.error('Something went wrong!');
      }
      )
  }
}

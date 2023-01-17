import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../service/crud.service';
import { NavService } from '../service/nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  books :any
  myreadings:any[] = [];
  constructor(public nav:NavService, private crudservice:CRUDService) {
    this.nav.show();
   }

   ngOnInit(): void {
    this.crudservice.getAllBooks().subscribe(response => {
        this.books = response;
    });
  }
  getMyReadings(){
    //console.log(this.crudservice.getMyReadings());
    this.crudservice.getMyReadings(); 
    this.myreadings = this.crudservice.myReadings;
    console.log(this.myreadings);
  }
}

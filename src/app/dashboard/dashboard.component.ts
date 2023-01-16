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
  constructor(public nav:NavService, private crudservice:CRUDService) {
    this.nav.show();
   }

   ngOnInit(): void {
    this.crudservice.getAllBooks().subscribe(response => {
        this.books = response;
    });
  }
}

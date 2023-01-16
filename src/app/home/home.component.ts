import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../service/crud.service';
import { NavService } from '../service/nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText:string ="";
  books:any;
  constructor(public nav:NavService, public crudservice:CRUDService) {
    // this.nav.show();
   }
  onSearchTextEnterd(searchValue:string){
    this.searchText = searchValue;
    console.log(this.searchText);
  }
  ngOnInit() {
    this.crudservice.getAllBooks().subscribe(data=>{
      this.books = data;
    });
  }
  addDashBoard(){
    this.crudservice
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/authentication.service';
import { CRUDService } from '../service/crud.service';
import { NavService } from '../service/nav.service';
import { HomeModule } from './home.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText:string ="";
  books:any;
  userReadings!:any
  homeModuleObj : HomeModule = new HomeModule();
  currentUser:any;
  constructor(public nav:NavService, public crudservice:CRUDService, private auth:AuthService) {
    
   }
   
  onSearchTextEnterd(searchValue:string){
    this.searchText = searchValue;
    // console.log(this.searchText);
  }
  ngOnInit() {
    this.crudservice.getAllBooks().subscribe(data=>{
      this.books = data;
    });
  }
  getBooks(){
    this.auth.getDashboard().subscribe(dashBoard=>{
      this.userReadings = dashBoard;
    })
  }
  checkDuplicates(book:any):any{
    let len = book.length;
    for(let obj in book){
      // if(obj.) 
    }
    this.getBooks();
    console.log(this.userReadings)
    return true;
  }
  addDashBoard(item:any){
    this.homeModuleObj.email = this.auth.getEmail();
    this.homeModuleObj.mybooks = item;
    //console.log(this.homeModuleObj);
    this.currentUser = this.auth.getEmail();
      this.auth.postDashBoard(this.homeModuleObj)
      .subscribe(
        res=>{
          //console.log(res);
        }
      );
  }
  
}

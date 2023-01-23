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
    this.getDashboardBooks();  
  }
  getDashboardBooks(){
    this.auth.getDashboard().subscribe(dashBoard=>{
      this.userReadings = dashBoard;
    })
  }
  checkDuplicates(book:Object):any{
    this.getDashboardBooks();
    for(let obj of this.userReadings){
      if(obj.email ===this.currentUser && obj.mybooks.id === this.homeModuleObj.mybooks.id) {
        return false;
      }
    }
    return true;
  }
  addDashBoard(item:Object){
    this.homeModuleObj.email = this.auth.getEmail();
    this.homeModuleObj.mybooks = item;
    sessionStorage.setItem('bookid',this.homeModuleObj.mybooks.id)
    this.currentUser = this.auth.getEmail();
    this.getDashboardBooks();
    if(this.checkDuplicates(this.homeModuleObj)){
      this.auth.postDashBoard(this.homeModuleObj)
      .subscribe(
        res=>{
          
        }
      );
    }
  }
  
}

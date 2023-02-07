import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  searchText: string = "";
  books: any;
  userReadings!: any
  homeModuleObj: HomeModule = new HomeModule();
  currentUser: any;
  count:number=123;
  constructor(public nav: NavService, 
    public crudservice: CRUDService, 
    private auth: AuthService,
    private toastr: ToastrService) {

  }

  onSearchTextEnterd(searchValue: string) {
    this.searchText = searchValue;
    // console.log(this.searchText);
  }
  ngOnInit() {
    this.crudservice.getAllBooks().subscribe(data => {
      this.books = data;
    },
    error=>{
      this.toastr.error('Something went wrong!');
    });
    this.getDashboardBooks();
    this.nav.toggle();
  }
  getDashboardBooks() {
    this.auth.getDashboard().subscribe(dashBoard => {
      this.userReadings = dashBoard;
    },
    error=>{
      this.toastr.error('Something went wrong!');
    })
  }
  checkDuplicates(book: Object): any {
    this.getDashboardBooks();
    for (let obj of this.userReadings) {
      if (obj.email === this.currentUser && obj.mybooks.id === this.homeModuleObj.mybooks.id) {
        return false;
      }
    }
    return true;
  }
  addDashBoard(item: Object) {
    this.homeModuleObj.email = this.auth.getEmail();
    this.homeModuleObj.mybooks = item;
    localStorage.setItem('bookid', this.homeModuleObj.mybooks.id)
    this.currentUser = this.auth.getEmail();
    this.getDashboardBooks();
    if (this.checkDuplicates(this.homeModuleObj)) {
      this.auth.postDashBoard(this.homeModuleObj)
        .subscribe(
          res => {
          },
          error=>{
            this.toastr.error('Something went wrong!');
          }
        );
    }
  }

}

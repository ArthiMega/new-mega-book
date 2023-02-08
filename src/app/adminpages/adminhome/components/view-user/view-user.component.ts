import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/authentication.service';
import { CRUDService } from 'src/app/service/crud.service';
import { NavService } from 'src/app/service/nav.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  users!: any;
  dashBoard!: any;
  searchText: string = "";
  cartedBooks: any;
  constructor(private crudservice: CRUDService,
    private auth: AuthService,
    private route: Router,
    private toastr:ToastrService,
    private nav: NavService
  ) { }
  viewUsers() {
    this.crudservice.getUserInfo().subscribe(response => {
      this.users = response;
    },
    error=>{
      this.toastr.error('Something went wrong!');
    })
  }
  viewUserBooks() {
    this.auth.getDashboard().subscribe(data => {
      this.dashBoard = data;
    },error=>{
      this.toastr.error('Something went wrong!');
    })
  }
  ngOnInit() {
    this.viewUsers();
    this.viewUserBooks();
    this.getCart();
    this.nav.hide();
  }
  onSearchTextEnterd(searchValue: string) {
    this.searchText = searchValue;
    // console.log(this.searchText);
  }
  getCart() {
    this.auth.getCart().subscribe(res => {
      this.cartedBooks = res;
    },
    erro=>{
      this.toastr.error('Something went wrong!')
    })
  }
}

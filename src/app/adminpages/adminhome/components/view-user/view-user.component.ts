import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authentication.service';
import { CRUDService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  users!:any;
  dashBoard!:any;
  searchText:string ="";
  cartedBooks: any;
  constructor(private crudservice:CRUDService,
              private auth:AuthService,
              private route:Router
              ) { }
  viewUsers(){
    this.crudservice.getUserInfo().subscribe(response=>{
      this.users = response;
    })
  }
viewUserBooks(){
  this.auth.getDashboard().subscribe(data=>{
  this.dashBoard = data;
  })
}
  ngOnInit() {
    if(!this.auth.isAdmin()){
      this.route.navigate(['../home'])
    }
    this.viewUsers();
    this.viewUserBooks();
    this.getCart();
  }
  onSearchTextEnterd(searchValue:string){
    this.searchText = searchValue;
    // console.log(this.searchText);
  }
  getCart(){
    this.auth.getCart().subscribe(res=>{
      this.cartedBooks = res;
    })
  }
}

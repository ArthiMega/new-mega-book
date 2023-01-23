import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication.service';
import { CRUDService } from '../service/crud.service';
import { NavService } from '../service/nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users!:any;
  books!:any;
  useremail!:any
  userEmail = this.auth.getEmail();
  constructor(private auth:AuthService,
              private crudservice:CRUDService) { 
   }

   ngOnInit(): void {
    this.getBooks();
    this.getUser();
  }
  getUser(){
    this.auth.getDashboard().subscribe(data=>{
      this.users = data;
    })
  }
  getBooks(){
    this.crudservice.getAllBooks().subscribe(res=>{
      this.books = res;
    })
  }
  isReaded():any{
    if(sessionStorage.getItem('bookid') === null){
      return true;
    }
    else{
      return false;
    }
  }    
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/authentication.service';
import { CRUDService } from '../service/crud.service';
import { NavService } from '../service/nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users!: any;
  books!: any;
  useremail!: any
  userEmail = this.auth.getEmail();
  cartedBooks: any;
  constructor(private auth: AuthService,
    private crudservice: CRUDService,
    private router: Router,
    private toastr:ToastrService) {
  }

  ngOnInit(): void {
    this.getBooks();
    this.getUser();
    this.getPurchasedBookDetails()
  }
  getUser() {
    this.auth.getDashboard().subscribe(data => {
      this.users = data;
    },
    erroe=>{
      this.toastr.error('Somthing went wrong!');
    })
  }
  getBooks() {
    this.crudservice.getAllBooks().subscribe(res => {
      this.books = res;
    },
    error=>{
      this.toastr.error('Something went wrong!');
    })
  }
  getPurchasedBookDetails() {
    this.auth.getCart().subscribe(res => {
      this.cartedBooks = res;
    },
    error=>{
      this.toastr.error('Something went wrong!');
    })
  }

  readNow(id: any) {
    localStorage.setItem('bookid', id)
    this.router.navigate(['book'])
  }
}

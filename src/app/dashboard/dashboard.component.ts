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

  users!: any;
  books!: any;
  useremail!: any
  userEmail = this.auth.getEmail();
  cartedBooks: any;
  constructor(private auth: AuthService,
    private crudservice: CRUDService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getBooks();
    this.getUser();
    this.getPurchasedBookDetails()
  }
  getUser() {
    this.auth.getDashboard().subscribe(data => {
      this.users = data;
    })
  }
  getBooks() {
    this.crudservice.getAllBooks().subscribe(res => {
      this.books = res;
    })
  }
  getPurchasedBookDetails() {
    this.auth.getCart().subscribe(res => {
      this.cartedBooks = res;
    })
  }

  readNow(id: any) {
    sessionStorage.setItem('bookid', id)
    this.router.navigate(['book'])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/authentication.service';
import { CRUDService } from '../service/crud.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book!: any
  bookId = localStorage.getItem('bookid')
  anchor: string = "Read more";
  expand: boolean = false;
  cartItems !: any;
  constructor(private crudservice: CRUDService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService) { }
  ngOnInit() {
    this.getBook();
    this.getAllCart();
  }
  getBook() {
    this.crudservice.getIndividualBook(Number(this.bookId)).subscribe((response: any) => {
      this.book = response;
    },
    (error:any)=>{
      this.toastr.success('Something went wrong!');
    }
    )
  }
  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
  getAllCart() {
    this.auth.getCart().subscribe(data => {
      this.cartItems = data;
    },
    error=>{
      this.toastr.error('Somthing went wrong!');
    });
  }
  isInCart(id: any): any {
    this.getAllCart();
    for (let item of this.cartItems) {
      if (item.email === sessionStorage.getItem('email') && item.cartedBooks.id == id) {
        return true;
      }
    }
    return false;
  }
  showMore() {
    if (this.isInCart(this.bookId)) {
      this.expand = !this.expand;
      this.anchor = !this.expand ? "Read more" : ""
    }
    else {
      this.router.navigate(['buy']);
    }
  }
}

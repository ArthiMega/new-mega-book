import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication.service';
import { CRUDService } from '../service/crud.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book!:any
  bookId = sessionStorage.getItem('bookid')
  anchor :string= "Read more";
  expand: boolean = false;
  id = sessionStorage.getItem('bookid');
  cartItems !:any; 
  constructor(private crudservice :CRUDService,
              private router: Router,
              private auth:AuthService) { }
  ngOnInit() {
   console.log(this.id) 
   this.getBook();
   this.getAllCart();
  }
  getBook(){
    this.crudservice.getIndividualBook(Number(this.bookId)).subscribe((response:any)=>{
      this.book = response;
    })
  }
goToTop(){
  window.scroll({
    top:0,
    left:0,
    behavior:'smooth'
  })
}
getAllCart(){
  this.auth.getCart().subscribe(data=>{
    this.cartItems = data;
  });
}
isInCart(id:any):any{
  this.getAllCart();
  for(let item of this.cartItems){
    //console.log(item.email === sessionStorage.getItem('email') );
    //console.log(item.cartedBooks.id === id);
    console.log(item.cartedBooks.id);
    console.log(id);
    console.log(item.cartedBooks.id == id)
    if(item.email === sessionStorage.getItem('email')  && item.cartedBooks.id == id){
      return true;
    }
  }
  return false;
}
showMore(){
  //console.log(this.isInCart(this.bookId))
  if(this.isInCart(this.bookId)){
    this.expand = !this.expand;
    this.anchor = !this.expand ? "Read more":""
  }
  else{
  this.router.navigate(['buy']);
  }
  }
}

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
  constructor(private crudservice :CRUDService,
              private router: Router,
              private auth:AuthService) { }
  ngOnInit() {
   console.log(this.id) 
   this.getBook();
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
isInCart(id:any):any{
  this.auth.getCart().subscribe(data=>{
    
  })
}
showMore(){
  sessionStorage.setItem('bookid',this.book.id);
  if(sessionStorage.getItem('isBuyed')==='yes'){
    this.expand = !this.expand;
    this.anchor = !this.expand ? "Read more":""
  }
  else{
  this.router.navigate(['buy']);
  }
  }
}

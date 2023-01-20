import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../service/crud.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book!:any
  id = sessionStorage.getItem('bookid');
  constructor(private crudservice :CRUDService) { }
  ngOnInit() {
   console.log(this.id) 
   this.getBook();
  }
  getBook(){
    this.crudservice.getIndividualBook(Number(this.id)).subscribe(response=>{
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
}

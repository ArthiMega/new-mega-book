import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
goToTop(){
  window.scroll({
    top:0,
    left:0,
    behavior:'smooth'
  })
}
}

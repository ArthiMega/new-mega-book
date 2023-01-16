import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CRUDService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-editebooks',
  templateUrl: './editebooks.component.html',
  styleUrls: ['./editebooks.component.css']
})
export class EditebooksComponent implements OnInit {

  books!:any;
  constructor(private crudservice:CRUDService, private router:Router) { }
  viewBooks(){
    this.crudservice.getAllBooks().subscribe(response=>{
      this.books = response;
    })
  }
  deleteBook(id:any){
    if(window.confirm('Are you sure you want to delete?')){
      this.crudservice.deleteBook(id).subscribe(data=>{
        console.log(data);
        this.router.navigate(['adminpages/editbooks'])
      })
    }
  }
  ngOnInit() {
    this.viewBooks();
  }
  }
  


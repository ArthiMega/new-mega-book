import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authentication.service';
import { CRUDService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-editebooks',
  templateUrl: './editebooks.component.html',
  styleUrls: ['./editebooks.component.css']
})
export class EditebooksComponent implements OnInit {

  books!:any;
  searchText:string ="";
  constructor(private crudservice:CRUDService, 
    private router:Router,
    private auth:AuthService) { }
  viewBooks(){
    this.crudservice.getAllBooks().subscribe(response=>{
      this.books = response;
    })
  }
  deleteBook(id:any){
    if(window.confirm('Are you sure you want to delete?')){
      this.crudservice.deleteBook(id).subscribe(data=>{
        window.location.reload();
        this.router.navigate(['adminpages/editbooks'])
      })
    }
  }
  ngOnInit() {
    this.viewBooks();
    if(!this.auth.isAdmin()){
      this.router.navigate(['../home'])
    }
  }
  onSearchTextEnterd(searchValue:string){
    this.searchText = searchValue;
    // console.log(this.searchText);
  }
  }
  


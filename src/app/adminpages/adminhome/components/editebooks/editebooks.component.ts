import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/authentication.service';
import { CRUDService } from 'src/app/service/crud.service';
import { NavService } from 'src/app/service/nav.service';


@Component({
  selector: 'app-editebooks',
  templateUrl: './editebooks.component.html',
  styleUrls: ['./editebooks.component.css']
})
export class EditebooksComponent implements OnInit {

  books!: any;
  searchText: string = "";
  constructor(private crudservice: CRUDService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
    private nav :NavService) { }
    ngOnInit() {
      this.viewBooks();
      this.nav.hide()
    }

  onSearchTextEnterd(searchValue: string) {
    this.searchText = searchValue;
    // console.log(this.searchText);
  }
    viewBooks() {
    this.crudservice.getAllBooks().subscribe(response => {
      this.books = response;
    },
    error=>{
      this.toastr.error("Somethinng went wrong!");
    })
  }
  deleteBook(id: any) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.crudservice.deleteBook(id).subscribe(data => {
        window.location.reload();
        this.router.navigate(['adminpages/editbooks'])
      },
      error=>{
        this.toastr.error('Somthing went wrong!');
      })
    }
  }
}



import { Component, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  users!:any;
  constructor(private crudservice:CRUDService) { }
  viewUsers(){
    this.crudservice.getUserInfo().subscribe(response=>{
      this.users = response;
    })
  }

  ngOnInit() {
    this.viewUsers();
  }

}

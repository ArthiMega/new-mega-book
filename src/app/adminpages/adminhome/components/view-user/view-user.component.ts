import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authentication.service';
import { CRUDService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  users!:any;
  constructor(private crudservice:CRUDService,
              private auth:AuthService,
              private route:Router
              ) { }
  viewUsers(){
    this.crudservice.getUserInfo().subscribe(response=>{
      this.users = response;
    })
  }

  ngOnInit() {
    if(!this.auth.isAdmin()){
      this.route.navigate(['../home'])
    }
    this.viewUsers();
  }

}

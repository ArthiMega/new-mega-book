import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authentication.service';
import { NavService } from 'src/app/service/nav.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router, private nav :NavService) { }

  ngOnInit() {
    this.nav.hide();
  }

}

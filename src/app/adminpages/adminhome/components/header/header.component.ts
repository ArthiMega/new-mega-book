import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authentication.service';
import { NavService } from 'src/app/service/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private nav:NavService) { }
  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.nav.hide();
  }

}

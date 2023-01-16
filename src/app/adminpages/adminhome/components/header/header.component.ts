import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService) { }
  logout(){
    this.auth.logout();
  }

  ngOnInit() {
  }

}

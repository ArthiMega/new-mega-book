import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './service/authentication.service';
import { NavService } from './service/nav.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Mega-Book';
  constructor(private auth: AuthService, public nav: NavService) { }
  isAdmn() {
    return this.auth.isAdmin()
  }
  
}

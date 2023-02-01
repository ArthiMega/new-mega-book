import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './service/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'mega-book';
  constructor(private auth: AuthService) { }
  isAdmn() {
    return this.auth.isAdmin()
  }
}

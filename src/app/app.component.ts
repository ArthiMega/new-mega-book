import { Component } from '@angular/core';
import { AuthService } from './service/authentication.service';
import { CRUDService } from './service/crud.service';
import { NavService } from './service/nav.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mega-book';
  user = true;
  admin = true;
  posts: any;
  
  constructor(public nav: NavService, private auth:AuthService){}
  isAdmn(){
    return this.auth.isAdmin()
   }
  
  
}

import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './service/authentication.service';
import { CRUDService } from './service/crud.service';
import { NavService } from './service/nav.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent {
  title = 'mega-book'; 
  constructor(public nav: NavService, private auth:AuthService){}
  isAdmn(){
    return this.auth.isAdmin()
   }
  
  
}

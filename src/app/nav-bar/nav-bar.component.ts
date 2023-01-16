import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../service/authentication.service';
import { CRUDService } from '../service/crud.service';
import { NavService } from '../service/nav.service';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from '../registration/registration.component';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  enteredSearchValue: string = "";
  constructor(public nav: NavService, public auth:AuthService, private modalService: NgbModal) {
   }
  
  ngOnInit() {
  }
  @Output()
  searchTextChaned: EventEmitter<string> = new EventEmitter<string>();//property
  onSearchTextChanged(){
    this.searchTextChaned.emit(this.enteredSearchValue);
  }
}

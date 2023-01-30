import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../service/authentication.service';
import { NavService } from '../service/nav.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  enteredSearchValue: string = "";
  constructor(public nav: NavService, public auth: AuthService) {
  }

  ngOnInit() {
  }
  @Output()
  searchTextChaned: EventEmitter<string> = new EventEmitter<string>();//property
  onSearchTextChanged() {
    this.searchTextChaned.emit(this.enteredSearchValue);
  }
}

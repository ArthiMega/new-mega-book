import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataComponent } from '../data/data.component';
import { AuthService } from '../service/authentication.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @ViewChild(DataComponent)
  public data!: DataComponent;
  enteredSearchValue: string = "";
  constructor(public auth: AuthService) {
  }
  ngOnInit() {
  }
  @Output()
  searchTextChaned: EventEmitter<string> = new EventEmitter<string>();//property
  onSearchTextChanged() {
    this.searchTextChaned.emit(this.enteredSearchValue);
  }
}

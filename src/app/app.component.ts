import { Component, ViewEncapsulation } from '@angular/core';
import { NavService } from './service/nav.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Mega-Book';
  constructor(public nav: NavService) {  
}
}
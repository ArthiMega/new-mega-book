import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../service/crud.service';
import { Observable } from 'rxjs';
import { AuthService } from '../service/authentication.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  individualUser!: any
  constructor(private auth: AuthService) { }
  ngOnInit() {
    this.getindividualUser();
  }
  getindividualUser() {
    this.auth.getIndividualUser().subscribe(data => {
      this.individualUser = data;
    })
  }
}




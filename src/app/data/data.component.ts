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
user!:any
constructor(private auth:AuthService){}
  ngOnInit() {
    this.auth.getIndividualUser().subscribe(response=>{
      this.user = response;
    })
  }

  // save(){
  //   this.service.saveData(data:any)
  // }
}




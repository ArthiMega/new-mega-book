import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from '../service/crud.service';
import { NavService } from '../service/nav.service';
import { AuthService } from '../service/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  url = "/"
  users :any;
  books:any;
  constructor(private http: HttpClient, private service :CRUDService, public nav:NavService, private auth:AuthService) {
    this.nav.hide();
   }
   logout(){
    this.auth.logout();
   }
  ngOnInit() {
    this.service.getUserInfo().subscribe(response=>{
      this.users= response;
    });
    this.service.getAllBooks().subscribe(res=>{
      this.books = res;
    });
  }
  selectedFiles!:File;
  selectImages(event:any){
      this.selectedFiles = event.target.file[0];
      console.log(event);
  }
  onUpload(){
    const formData = new FormData();
    formData.append("image",this.selectedFiles, this.selectedFiles.name)
    this.http.post("http://localhost:3000/v_data",formData).subscribe(result=>{
      console.log(result);
    });
  }
  file!: File;
 
 
 onFilechange(event: any) {
   console.log(event.target.files[0])
   this.file = event.target.files[0]
 }
 
 upload() {
   if (this.file) {
     this.service.uploadfile(this.file).subscribe(resp => {
       alert("Uploaded")
     })
   } else {
     alert("Please select a file first")
   }
 }
 getUser(){

 }
}

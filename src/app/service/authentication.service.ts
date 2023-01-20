import { Observable, of, throwError,map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = "http://localhost:3000/";
  userId!:number;
  admin:boolean = false;
  userEmail!:string;
  constructor(private router: Router, 
            private http: HttpClient,
            private toastr:ToastrService) {}

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  setEmail(email:string){
    sessionStorage.setItem('email',email);
  }
  getEmail():string|null{
    return sessionStorage.getItem('email')
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
      sessionStorage.removeItem('token');
      this.router.navigate(['login']);
  }

  isAdmin(){
    return this.getToken()=='zyxwvutsrqponmlkjihgfedcba';
  }
  login(email:string, password:string ){
  if(email === "arthi@test.com" && password ==="567"){
    this.setToken('zyxwvutsrqponmlkjihgfedcba');
    this.toastr.success("Logged in successfully!");
    this.isAdmin();
    this.router.navigate(['adminpages']);
  }
  else{
  this.http.get<any>("http://localhost:3000/user-data")
  .subscribe(res=>{
    const user = res.find((a:any)=>{
      this.userId = a.id;
      // this.userEmail = email
      return a.email === email && a.password === password
    });
    if(user){
      //console.log(res);
      this.setEmail(email);
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.toastr.success("Logged in successfully!","User",{"positionClass":"toast-top-right"});
      this.router.navigate(['home']);
    }
    else
    {
      this.toastr.warning('Usernot found')
      this.router.navigate(['login']);
    }
  },err=>{
    this.toastr.error('Something was wrong');
  })
}
   }
   getIndividualUser(){
    return this.http.get(`${this.baseURL}user-data/${this.userId}`);
  }
  postDashBoard(data:any){
    return this.http.post<any>(this.baseURL+'myreading/',data).pipe(map((res:any)=>{
      return res;
    }))
  }
getDashboard(){
  return this.http.get(`${this.baseURL}myreading`)
}
}
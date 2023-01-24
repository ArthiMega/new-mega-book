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
  userId!:any;
  message:string='';
  admin:boolean = false;
  userEmail!:string;
  adminDetails:any;
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
      sessionStorage.removeItem('bookid')
      sessionStorage.removeItem('token');
      this.router.navigate(['login']);
  }

  isAdmin(){
    return this.getToken()=='zyxwvutsrqponmlkjihgfedcba';
  }
  getUser(){
    return this.http.get(this.baseURL+'user-data');
  }
  adminlogin(){
    this.http.get<any>(`${this.baseURL}admin-data`)
    .subscribe(res=>{
      this.adminDetails = res;
        // return res.email === email && res.password === password
      });
  }
  checkAdmin(email:string,password:string):any{
    for(let admin of this.adminDetails){
      if(admin.email === email && admin.password === password ){
        return true;
      }
    }
    return false;
  }
  login(email:string, password:string ){
  if(this.checkAdmin(email,password)){
    this.setToken('zyxwvutsrqponmlkjihgfedcba');
    this.toastr.success("Logged in successfully!");
    this.isAdmin();
    this.router.navigate(['adminpages']);
  }
  else{
  this.http.get<any>(`${this.baseURL}user-data`)
  .subscribe(res=>{
    const user = res.find((a:any)=>{
      this.userId = a.id;
      return a.email === email && a.password === password
    });
    if(user){
      this.setEmail(email);
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.toastr.success("Logged in successfully!","User",{"positionClass":"toast-top-right"});
      this.router.navigate(['home']);
    }
    else
    {
      //this.toastr.warning('Usernot found')
      this.message = "Username or password incorrect :("
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
buyNow(data:any){
  return this.http.post(`${this.baseURL}cart`,data).pipe(map((res:any)=>{
    return res;
  }))
}
getCart(){
  return this.http.get(`${this.baseURL}cart`)
}
isCarted(){
  
}
}
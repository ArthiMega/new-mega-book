import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = "http://localhost:3000/";
  userId!:number;
  admin:boolean = false;
  constructor(private router: Router, private http: HttpClient) {}

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
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
    alert("Logged in successfully!");
    this.isAdmin();
    this.router.navigate(['adminpages']);
  }
  else{
  this.http.get<any>("http://localhost:3000/user-data")
  .subscribe(res=>{
    const user = res.find((a:any)=>{
      this.userId = a.id;
      return a.email === email && a.password === password
    });
    if(user){
      console.log(res);
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      alert("Logged in successfully!")
      this.router.navigate(['home']);
    }
    else
    {
      alert('Usernot found')
      this.router.navigate(['login']);
    }
  },err=>{
    alert('Something was wrong');
  })
}
   }
   getIndividualUser(){
    return this.http.get(`${this.baseURL}user-data/${this.userId}`);
  }
}
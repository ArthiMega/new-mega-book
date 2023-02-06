import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = "http://localhost:3000/";
  userId!: any;
  message: string = '';
  userEmail!: string;
  adminDetails: any;
  sign!:any;
  secret!:string;
  access!:any;
  decoded!:any;
  constructor(private router: Router,
    private http: HttpClient,
    private toastr: ToastrService) { }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  setEmail(email: string) {
    sessionStorage.setItem('email', email);
  }
  getEmail(): string | null {
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

  isAdmin() {
    this.access = this.getToken();
    this.decoded = jwt_decode(this.access);
    return this.decoded.access == 'admin';
  }
  getUser() {
    return this.http.get(this.baseURL + 'user-data');
  }
  adminlogin() {
    this.http.get<any>(`${this.baseURL}admin-data`)
      .subscribe(res => {
        this.adminDetails = res;
      },
      error=>{
        this.toastr.error('Something went wrong!');
      });
  }
  checkAdmin(email: string, password: string): any {
    this.adminlogin();
    for (let admin of this.adminDetails) {
      if (admin.email === email && admin.password === password) {
        return true;
      }
    }
    return false;
  }
  login(email: string, password: string) {
    if (this.checkAdmin(email, password)) {
      this.sign = require('jwt-encode');
      this.secret = 'Admin@123asdfghjkl';
      let data = {
        access:'admin',
        email:email
      }
      let jwt = this.sign(data,this.secret);
      this.setToken(jwt);
      this.toastr.success("Logged in successfully!");
      this.router.navigate(['adminpages']);
    }
    else {
      this.http.get<any>(`${this.baseURL}user-data`)
        .subscribe(res => {
          const user = res.find((a: any) => {
            this.userId = sessionStorage.setItem('userid', a.id)
            return a.email === email && a.password === password
          });
          if (user) {
            this.setEmail(email);
           let sign = require('jwt-encode');
           let secret = 'Useri@123asdfghjkl';
           let data = {
              access : 'user',
              email:email
            };
            let jwt = sign(data,secret);
            this.setToken(jwt);
            this.toastr.success("Logged in successfully!", "User", { "positionClass": "toast-top-right" });
            this.router.navigate(['home']);
          }
          else {
            //this.toastr.warning('Usernot found')
            this.message = "Username or password incorrect :("
            this.router.navigate(['login']);
          }
        }, err => {
          this.toastr.error('Something was wrong');
        })
    }
  }
  getIndividualUser() {
    return this.http.get(`${this.baseURL}user-data/${sessionStorage.getItem('userid')}`);
  }
  postDashBoard(data: any) {
    return this.http.post<any>(this.baseURL + 'myreading/', data).pipe(map((res: any) => {
      return res;
    }))
  }
  getDashboard() {
    return this.http.get(`${this.baseURL}myreading`)
  }
  buyNow(data: any) {
    return this.http.post(`${this.baseURL}cart`, data).pipe(map((res: any) => {
      return res;
    }))
  }
  getCart() {
    return this.http.get(`${this.baseURL}cart`)
  }
}
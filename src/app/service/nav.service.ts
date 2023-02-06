import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class NavService {
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  decoded = jwt_decode(this.token);
  visible: boolean = true;
  sign = require('jwt-encode');
  secret = 'Arthi@123asdfghjkl';
  data = {
    sub: '1234567890',
    name: 'John Doe'
  };
  jwt = this.sign(this.data,this.secret);
  constructor() { }
  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { console.log(this.decoded);
          console.log(this.jwt) }
}

import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';
import {Request, Response} from 'express'
import * as express from 'express';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  visible:boolean = true;
constructor() { }
hide() { this.visible = false; }

show() { this.visible = true; }

toggle() { this.visible = !this.visible; }
// genarateJWT(){
//   const payload = {
//     name:'pattu',
//     nickname:'chella  pattu'
//   };
//   const secret = 'secret- key';
//   return jwt.sign(payload, secret);
// }
}

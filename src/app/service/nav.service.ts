import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  visible: boolean = true;

  constructor() { }
  hide() { this.visible = false; }

  show() { this.visible = true; }

  // toggle() {}
}

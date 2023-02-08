import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGaurdGuard implements CanActivate {
  constructor(private auth:AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      if(!this.auth.isAdmin()){
        this.router.navigate(['/home']);
        return false;
      }
    return true;
  }
  
}

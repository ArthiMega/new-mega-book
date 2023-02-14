import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed,fakeAsync, tick, async } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../service/authentication.service';
// import { Location } from '@angular/common';
// import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
// import { HomeComponent } from '../home/home.component';
// import {routes} from '/home/asplap3268/gitworkspacenew/mega-book-master16.01.2023/src/app/adminpages/adminhome/adminhome-routing.module';


import { RoleGaurdGuard } from './role-gaurd.guard';

describe('RoleGaurdGuard', () => {
  let route : ActivatedRouteSnapshot;
  let state:RouterStateSnapshot;
  let guard: RoleGaurdGuard;
  let authService:AuthService;
  let router:Router
  beforeEach(async() => {
    TestBed.configureTestingModule({
     // declarations:[HomeComponent],
      providers:[RoleGaurdGuard,HttpClient, HttpHandler,{provide:Router, useValue:router}, AuthService],
      imports:[ToastrModule.forRoot()] //RouterTestingModule.withRoutes(routes)
    });
    //router = TestBed.get(Router);
  });
  beforeEach(()=>{
    guard = TestBed.inject(RoleGaurdGuard);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('be able yo hit when user is logged in',()=>{
    authService.isLoggedIn();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(guard.canActivate(route,state)).toBe(true);
    expect(navArgs[0]).toBe('/home')
  });
  it('be not able yo hit when user is logged in',()=>{
    authService.isLoggedIn();
    expect(guard.canActivate(route,state)).toBe(false);
  });

});

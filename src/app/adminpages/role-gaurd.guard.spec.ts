import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed,fakeAsync, tick } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
// import { Location } from '@angular/common';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import { HomeComponent } from '../home/home.component';
// import {routes} from '/home/asplap3268/gitworkspacenew/mega-book-master16.01.2023/src/app/adminpages/adminhome/adminhome-routing.module';


import { RoleGaurdGuard } from './role-gaurd.guard';

describe('RoleGaurdGuard', () => {
  let guard: RoleGaurdGuard;
  //let router:Router

  beforeEach(() => {
    TestBed.configureTestingModule({
     // declarations:[HomeComponent],
      providers:[HttpClient, HttpHandler],
      imports:[ToastrModule.forRoot()] //RouterTestingModule.withRoutes(routes)
    });
    //router = TestBed.get(Router);
    guard = TestBed.inject(RoleGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  // it('navigate to home component',fakeAsync(()=>{
  //   router.navigate(["/home"]).then(()=>{
  //     expect(location.pathname()).toBe("/home");
  //   });
  // }))
});

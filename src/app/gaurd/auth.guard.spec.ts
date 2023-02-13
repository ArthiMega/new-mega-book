import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { Params, Route, Router, UrlSegment } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../service/authentication.service';
import { NavService } from '../service/nav.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  let authService:AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        HttpClient, 
        HttpHandler,
        {
        provide:Router,
        useValue: router
        },AuthService,
        {
          provide:AuthService,
          useClass:NavService
        }
      ],
      imports:[ToastrModule.forRoot()]
    });
    guard = TestBed.inject(AuthGuard);
  });
  it('should route',()=>{
    expect(guard.canActivate(<any>{},<any>{})).toBe(false);
    expect(router.navigate).toHaveBeenCalledOnceWith(['/login'])
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

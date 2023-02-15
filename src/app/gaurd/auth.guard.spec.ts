import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { Params, Route, Router, UrlSegment } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RouterStateSnapshot } from '@angular/router';
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
describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'getToken']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
    authGuard = new AuthGuard(authService, router);
  });

  it('should return false and redirect to login if user is not logged in', () => {
    authService.getToken.and.returnValue(null);
    authService.isLoggedIn.and.callThrough();
    const result = authGuard.canActivate(route, state);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
  it('should return true if user is logged in', () => {
    authService.getToken.and.returnValue('testToken');
    authService.isLoggedIn.and.callThrough();
    const result = authGuard.canActivate(route, state);
    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
